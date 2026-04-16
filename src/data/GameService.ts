import { createClient, type ContentfulClientApi } from 'contentful';
import debug from 'debug';
import {
  Action,
  ActionType,
  Choice,
  Condition,
  ConditionType,
  Game,
  Item,
  Scene,
} from './Game';
import { Map } from './Types';

const log = debug('game:service');

// In production the app is served from seikkailut.pomeranssi.fi, where the
// reverse proxy forwards /contentful/* to cdn.contentful.com — so requests
// are same-origin there. In dev, Vite's server.proxy does the same forwarding
// locally (see vite.config.ts).
const client: ContentfulClientApi<undefined> = createClient({
  space: '534nukjx9idr',
  accessToken:
    '6cad7cd294a9be7b48bb087d799f6bd71fdd3b32c16ca63da69a4a224c558249',
  host: import.meta.env.DEV ? 'localhost:5173' : 'seikkailut.pomeranssi.fi',
  insecure: import.meta.env.DEV,
  basePath: 'contentful',
});

type CEntry = {
  sys: { id: string; contentType: { sys: { id: string } } };
  fields: Record<string, unknown>;
};

type CFile = { fields: { file: { url: string } } };

const gameCache: Map<Game> = {};
const sceneCache: Map<Scene> = {};
const itemCache: Map<Item> = {};

class GameService {
  public async getGames(): Promise<Game[]> {
    const entries = (await client.getEntries({
      content_type: 'game',
      include: 1,
    })) as unknown as { items: CEntry[] };
    const games = entries.items.map((i) => this.toGame(i));
    games.forEach((g) => (gameCache[g.id] = g));
    return games;
  }

  public async getGame(gameId: string): Promise<Game> {
    if (gameCache[gameId]) {
      return gameCache[gameId];
    }
    const entries = (await client.getEntries({
      content_type: 'game',
      'sys.id': gameId,
      include: 1,
    })) as unknown as { items: CEntry[] };
    const game = entries.items.map((i) => this.toGame(i))[0];
    gameCache[gameId] = game;
    return game;
  }

  public async getStart(game: Game): Promise<Scene> {
    if (!game.startSceneId) {
      throw new Error('no game');
    }
    return this.getScene(game, game.startSceneId);
  }

  public async getScene(game: Game, sceneId: string): Promise<Scene> {
    const id = `${game.id}::${sceneId}`;
    if (sceneCache[id]) {
      return sceneCache[id];
    }
    const result = (await client.getEntries({
      'sys.id': sceneId,
      include: 2,
    })) as unknown as { items: CEntry[] };
    const scene = this.toScene(result.items[0]);
    sceneCache[id] = scene;
    return scene;
  }

  public getGameLink(game: Game): string {
    return `/g/${game.id}`;
  }

  public getSceneLink(
    game: Game,
    sceneId: string,
    itemIds: string[],
  ): string {
    const items = itemIds.length > 0 ? '/' + itemIds.join('-') : '';
    return `/g/${game.id}/${sceneId}${items}`;
  }

  public async getItem(id: string): Promise<Item> {
    if (itemCache[id]) {
      return itemCache[id];
    }
    const items = (await client.getEntries({
      content_type: 'Item',
      'sys.id': id,
      include: 2,
    })) as unknown as { items: CEntry[] };
    const item = this.toItem(items.items[0]);
    itemCache[id] = item;
    return item;
  }

  private toItem = (x: CEntry): Item => {
    log('Item', x);
    const name = x.fields.name as string;
    const image = x.fields.image as CFile;
    return { name, id: x.sys.id, image: image.fields.file.url };
  };

  private toGame = (x: CEntry): Game => {
    log('Game', x);
    const startScene = x.fields.startScene as CEntry | undefined;
    const image = x.fields.image as CFile | undefined;
    return {
      name: x.fields.name as string,
      id: x.sys.id,
      description: x.fields.description as string,
      startSceneId: startScene ? startScene.sys.id : null,
      image: image ? image.fields.file.url : null,
    };
  };

  private toScene = (x: CEntry | undefined): Scene => {
    log('Scene', x);
    if (!x) {
      throw new Error('No scene');
    }
    const rawChoices = (x.fields.choices as CEntry[] | undefined) ?? [];
    const choices: Choice[] = rawChoices.map(this.toChoice);
    const image = x.fields.image as CFile | undefined;
    return {
      id: x.sys.id,
      name: x.fields.title as string,
      text: x.fields.description as string,
      question: x.fields.question as string | undefined,
      image: image ? image.fields.file.url : null,
      choices,
    };
  };

  private toConditionType(ctype: string): ConditionType {
    switch (ctype) {
      case 'conditionHasItem':
        return 'hasItem';
      case 'conditionDoesNotHaveItem':
        return 'doesNotHaveItem';
      default:
        log('Unknown condition type', ctype);
        return 'hasItem';
    }
  }

  private toCondition = (entry: CEntry): Condition => {
    log('Condition', entry);
    const item = entry.fields.item as CEntry;
    return {
      type: this.toConditionType(entry.sys.contentType.sys.id),
      item: item.sys.id,
    };
  };

  private toActionType(ctype: string): ActionType {
    switch (ctype) {
      case 'actionLoseItem':
        return 'loseItem';
      case 'actionReceiveItem':
        return 'receiveItem';
      default:
        log('Unknown action type', ctype);
        return 'receiveItem';
    }
  }

  private toAction = (entry: CEntry): Action => {
    log('Action', entry);
    const item = entry.fields.item as CEntry;
    return {
      type: this.toActionType(entry.sys.contentType.sys.id),
      item: item.sys.id,
    };
  };

  private toChoice = (entry: CEntry): Choice => {
    log('Choice', entry);
    const nextScene = entry.fields.nextScene as CEntry;
    const conditions =
      (entry.fields.conditions as CEntry[] | undefined) ?? [];
    const actions = (entry.fields.actions as CEntry[] | undefined) ?? [];
    return {
      id: entry.sys.id,
      text: entry.fields.title as string,
      sceneId: nextScene.sys.id,
      conditions: conditions.map(this.toCondition),
      actions: actions.map(this.toAction),
    };
  };
}

export const gameService = new GameService();
