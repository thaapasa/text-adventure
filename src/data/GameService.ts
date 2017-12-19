import { Game, Scene } from './Game';
import * as contentful from 'contentful';

const auth = {
  space: '534nukjx9idr',
  accessToken: '6cad7cd294a9be7b48bb087d799f6bd71fdd3b32c16ca63da69a4a224c558249',
  resolveLinks: false,
};

const client = contentful.createClient(auth);

class GameService {
  public async getGames(): Promise<Game[]> {
    return (await client.getEntries({ 'content_type': 'game' })).items.map(this.toGame);
  }

  // tslint:disable no-console
  // tslint:disable-next-line no-any
  private toGame(x: contentful.Entry<any>): Game {
    console.log(x);
    return {
      name: x.fields.name,
      id: x.sys.id,
      description: x.fields.description,
      startSceneId: x.fields.startScene.sys.id,
    };
  }

  public async getStart(game: Game): Promise<Scene> {
    throw 'nada';
  }

  public async getScene(game: Game, sceneId: string): Promise<Scene> {
    throw 'nada';
  }
}

export const gameService = new GameService();
