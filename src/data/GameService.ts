import { Game, Scene, Choice } from './Game';
import * as contentful from 'contentful';
import { EntryCollection, Entry } from 'contentful';
const debug = require('debug')('game:service');

const auth = {
  space: '534nukjx9idr',
  accessToken: '6cad7cd294a9be7b48bb087d799f6bd71fdd3b32c16ca63da69a4a224c558249',
};

const client = contentful.createClient(auth);

type CLink = Entry<{}>;

interface CGame {
  name: string;
  description: string;
  startScene: CLink;
  image: Entry<CImage>;
}

interface CImage {
  file: {
    url: string;
  };
}

interface CScene {
  title: string;
  description: string;
  question: string;
  choices: Entry<CChoice>[];
  image: Entry<CImage>;
}

interface CChoice {
  title: string;
  nextScene: CLink;
}

class GameService {
  public async getGames(): Promise<Game[]> {
    const entries = await client.getEntries({ 'content_type': 'game', include: 1 });
    return entries.items.map(i => this.toGame(i, entries));
  }

  public async getGame(gameId: string): Promise<Game> {
    const entries = await client.getEntries({ 'content_type': 'game', 'sys.id': gameId, include: 1 });
    return entries.items.map(i => this.toGame(i, entries))[0];
  }

  public async getStart(game: Game): Promise<Scene> {
    return this.getScene(game, game.startSceneId);
  }

  public async getScene(game: Game, sceneId: string): Promise<Scene> {
    return this.toScene(await client.getEntries({ 'sys.id': sceneId, include: 1 }));
  }

  private toGame = (x: contentful.Entry<CGame>, entries: EntryCollection<CGame>): Game => {
    debug('Game', x, 'entries', entries);
    return {
      name: x.fields.name,
      id: x.sys.id,
      description: x.fields.description,
      startSceneId: x.fields.startScene.sys.id,
      image: x.fields.image ? x.fields.image.fields.file.url : undefined,
    };
  }

  private toScene = async (result: EntryCollection<CScene>): Promise<Scene> => {
    debug('Scene', result);
    const x: Entry<CScene> = result.items[0];
    const choices: Choice[] = x.fields.choices ? x.fields.choices.map(this.toChoice) : [];
    return {
      id: x.sys.id,
      name: x.fields.title,
      text: x.fields.description,
      question: x.fields.question,
      image: x.fields.image ? x.fields.image.fields.file.url : undefined,
      choices,
    };
  }

  private toChoice = (entry: Entry<CChoice>): Choice => {
    debug('Choice', entry);
    return {
      text: entry.fields.title,
      sceneId: entry.fields.nextScene.sys.id,
    };
  }

}

export const gameService = new GameService();
