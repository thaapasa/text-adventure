import { Game } from './Game';

class GameService {
  async getGames(): Promise<Game[]> {
    return [{
        name: 'Apple Bloom ja tyrskyluodon merihirviöt',
        id: 'ab1',
    }];
  }
}

export const gameService = new GameService();
