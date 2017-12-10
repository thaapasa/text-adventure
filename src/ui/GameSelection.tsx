import * as React from 'react';
import './GameSelection.css';
import { Game } from '../data/Game';
import { gameService } from '../data/GameService';

interface GameSelectionProps {
  onSelectGame: (game: Game) => void;
}

interface GameSelectionState {
  games: Game[]; 
}

export default class GameSelection extends React.Component<GameSelectionProps, GameSelectionState> {
  public state: GameSelectionState = {
    games: [],
  };

  public async componentWillMount() {
    const games = await gameService.getGames();
    this.setState({ games });
  }

  public render() {
    return (
      <div className="GameSelection">
        <div className="Header">
          <h1>Pelit</h1>
        </div>
        <div className="Grid">
          {this.state.games.map(g =>
            <GameIcon {...g} key={g.id} onSelectGame={this.props.onSelectGame}/>)}
        </div>
      </div>
    );
  }
}

class GameIcon extends React.Component<Game & { onSelectGame: (game: Game) => void}, {}> {
  private selectGame = () => {
    this.props.onSelectGame(this.props);
  }
  public render() {
    return (
      <div className="Game" onClick={this.selectGame}>
        <h2 className="GameTitle">{this.props.name}</h2>
      </div>
    );
  }
}
