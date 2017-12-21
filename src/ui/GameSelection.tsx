import * as React from 'react';
import './GameSelection.css';
import Page from './Page';
import { Game } from '../data/Game';
import { gameService } from '../data/GameService';
const debug = require('debug')('game:selection');

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
    // tslint:disable-next-line no-console
    debug('Game list', games);
  }

  public render() {
    return (
      <Page title="Pelit" className="GameSelection">
        {this.state.games.map(g =>
          <GameIcon {...g} key={g.id} onSelectGame={this.props.onSelectGame}/>)}
      </Page>
    );
  }
}

class GameIcon extends React.Component<Game & { onSelectGame: (game: Game) => void}, {}> {
  private selectGame = () => {
    this.props.onSelectGame(this.props);
  }
  public render() {
    const style = this.props.image ? { backgroundImage: `url(${JSON.stringify(this.props.image)}` } : {};
    return (
      <div className="Game" onClick={this.selectGame} style={style}>
        <h2 className="GameTitle">{this.props.name}</h2>
      </div>
    );
  }
}
