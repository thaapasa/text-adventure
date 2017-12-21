import { Game, Scene } from './Game';
import * as contentful from 'contentful';
import { EntryCollection, Entry } from 'contentful';
const debug = require('debug')('game:service');

const auth = {
  space: '534nukjx9idr',
  accessToken: '6cad7cd294a9be7b48bb087d799f6bd71fdd3b32c16ca63da69a4a224c558249',
  resolveLinks: false,
};

const client = contentful.createClient(auth);

interface CGame {
  name: string;
  description: string;
  startScene: Entry<{}>;
  image: Entry<{}>;
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
}

class GameService {
  public async getGames(): Promise<Game[]> {
    const entries = await client.getEntries({ 'content_type': 'game' });
    return entries.items.map(i => this.toGame(i, entries));
  }

  public async getStart(game: Game): Promise<Scene> {
    return this.getScene(game, game.startSceneId);
  }

  public async getScene(game: Game, sceneId: string): Promise<Scene> {
    return this.toScene(await client.getEntry(sceneId));
  }

  private findIncludedAsset<T>(assetId: string, entries: EntryCollection<T>): Entry<CImage> | undefined {
    return entries.includes.Asset.find((x: Entry<{}>) => x.sys.id === assetId);
  }

  private getImageUrl(entry?: Entry<{ file: { url: string }}>): string | undefined {
    return entry ? entry.fields.file.url : undefined;
  }

  private toGame = (x: contentful.Entry<CGame>, entries: EntryCollection<CGame>): Game => {
    debug('Game', x, 'entries', entries);
    return {
      name: x.fields.name,
      id: x.sys.id,
      description: x.fields.description,
      startSceneId: x.fields.startScene.sys.id,
      image: x.fields.image ? this.getImageUrl(this.findIncludedAsset(x.fields.image.sys.id, entries)) : undefined,
    };
  }

  private toScene = (x: contentful.Entry<CScene>): Scene => {
    debug('Scene', x);
    return {
      id: x.sys.id,
      name: x.fields.title,
      text: x.fields.description,
      question: x.fields.question,
      choices: [],
    };
  }

}

export const gameService = new GameService();
