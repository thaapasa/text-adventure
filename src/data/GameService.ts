import { Game, Scene, Choice, Condition, ConditionType } from './Game';
import * as contentful from 'contentful';
import { EntryCollection, Entry } from 'contentful';
import { Map } from './Types';
const debug = require('debug')('game:service');

const auth = {
  space: '534nukjx9idr',
  accessToken: '6cad7cd294a9be7b48bb087d799f6bd71fdd3b32c16ca63da69a4a224c558249',
};

const client = contentful.createClient(auth);

type CLink = Entry<{}>;

interface CGame {
  readonly name: string;
  readonly description: string;
  readonly startScene: CLink;
  readonly image: Entry<CImage>;
}

interface CImage {
  readonly file: {
    readonly url: string;
  };
}

interface CScene {
  readonly title: string;
  readonly description: string;
  readonly question: string;
  readonly choices: Entry<CChoice>[];
  readonly image: Entry<CImage>;
}

interface CChoice {
  readonly title: string;
  readonly nextScene: CLink;
  readonly conditions?: Entry<CItemCondition>[];
}

interface CItemCondition {
  readonly item: Entry<CItem>;
}

interface CItem {
  readonly name: string;
}

const gameCache: Map<Game> = {};
const sceneCache: Map<Scene> = {};

class GameService {
  public async getGames(): Promise<Game[]> {
    const entries = await client.getEntries({ 'content_type': 'game', include: 1 });
    const games = entries.items.map(i => this.toGame(i, entries));
    games.forEach(g => gameCache[g.id] = g);
    return games;
  }

  public async getGame(gameId: string): Promise<Game> {
    if (gameCache[gameId]) { return gameCache[gameId]; }
    const entries = await client.getEntries({ 'content_type': 'game', 'sys.id': gameId, include: 1 });
    const game = entries.items.map(i => this.toGame(i, entries))[0];
    gameCache[gameId] = game;
    return game;
  }

  public async getStart(game: Game): Promise<Scene> {
    if (!game.startSceneId) { throw new Error('no game'); }
    return this.getScene(game, game.startSceneId);
  }

  public async getScene(game: Game, sceneId: string): Promise<Scene> {
    const id = `${game.id}::${sceneId}`;
    if (sceneCache[id]) { return sceneCache[id]; }
    const scene = await this.toScene(await client.getEntries({ 'sys.id': sceneId, include: 2 }));
    sceneCache[id] = scene;
    return scene;
  }

  public getGameLink(game: Game): string {
    return `/g/${game.id}`;
  }

  public getSceneLink(game: Game, sceneId: string): string {
    return `/g/${game.id}/${sceneId}`;
  }

  private toGame = (x: contentful.Entry<CGame>, entries: EntryCollection<CGame>): Game => {
    debug('Game', x, 'entries', entries);
    return {
      name: x.fields.name,
      id: x.sys.id,
      description: x.fields.description,
      startSceneId: x.fields.startScene ? x.fields.startScene.sys.id : null,
      image: x.fields.image ? x.fields.image.fields.file.url : null,
    };
  }

  private toScene = async (result: EntryCollection<CScene>): Promise<Scene> => {
    debug('Scene', result);
    const x: Entry<CScene> = result.items[0];
    if (!x) { throw new Error('No scene'); }
    const choices: Choice[] = x.fields.choices ? x.fields.choices.map(this.toChoice) : [];
    return {
      id: x.sys.id,
      name: x.fields.title,
      text: x.fields.description,
      question: x.fields.question,
      image: x.fields.image ? x.fields.image.fields.file.url : null,
      choices,
    };
  }

  private toConditionType(ctype: string): ConditionType {
    switch (ctype) {
      case 'conditionHasItem': return 'hasItem';
      case 'conditionDoesNotHaveItem': return 'doesNotHaveItem';
      default: debug('Unknown condition type', ctype); return 'hasItem';
    }
  }

  private toCondition = (entry: Entry<CItemCondition>): Condition => {
    debug('Condition', entry);
    return {
      type: this.toConditionType(entry.sys.contentType.sys.id),
      item: entry.fields.item.sys.id,
    };
  }

  private toChoice = (entry: Entry<CChoice>): Choice => {
    debug('Choice', entry);
    return {
      text: entry.fields.title,
      sceneId: entry.fields.nextScene.sys.id,
      conditions: entry.fields.conditions ? entry.fields.conditions.map(this.toCondition) : [],
      actions: [],
    };
  }

}

export const gameService = new GameService();
