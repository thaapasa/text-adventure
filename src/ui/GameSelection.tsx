import * as React from 'react';
import { Game } from '../data/Game';
import { gameService } from '../data/GameService';

interface GameSelectionState {
  games: Game[];
}

export default class GameSelection extends React.Component<{}, GameSelectionState> {
  public state: GameSelectionState = {
    games: [],
  };

  public async componentWillMount() {
    const games = await gameService.getGames();
    this.setState({ games });
  }

  public render() {
    return (
      <div className="game-selection">
        <div>Pelit</div>
        {this.state.games.map(g => <div key={g.id}>{g.name}</div>)}
      </div>
    );
  }
}
