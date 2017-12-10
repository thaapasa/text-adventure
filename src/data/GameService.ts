import { Game, Scene } from './Game';

const scenes: Scene[] = [
  { id: '1', name: 'Aamu', text: 'Eräänä aamuna Sweetie Bell heräsi.',
    question: 'Mitä Sweetie Bell tekee seuraavaksi?', choices: [] },
];

const sceneMap: { [id: string]: Scene } = {};
scenes.forEach(s => sceneMap[s.id] = s);

class GameService {
  public async getGames(): Promise<Game[]> {
    return [{
        name: 'Apple Bloom ja tyrskyluodon merihirviöt',
        id: 'ab1',
    }];
  }

  public async getStart(game: Game): Promise<Scene> {
    return sceneMap['1'];
  }

  public async getScene(game: Game, sceneId: string): Promise<Scene> {
    return sceneMap[sceneId];
  }
}

export const gameService = new GameService();
