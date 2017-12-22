import * as React from 'react';
import './GameSelection.css';
import Page from './Page';
import { Game } from '../data/Game';
import { gameService } from '../data/GameService';
import { ImageTile } from './ImageTile';
const debug = require('debug')('game:selection');

interface GameSelectionProps {
  onSelectGame: (game: Game) => void;
}

interface GameSelectionState {
  games: Game[]; 
}

class GameIcon extends React.Component<Game & { onSelectGame: (game: Game) => void}, {}> {
  private selectGame = () => {
    this.props.onSelectGame(this.props);
  }
  public render() {
    return (
      <ImageTile className="Game" onClick={this.selectGame} url={this.props.image}>
        <h2 className="GameTitle">{this.props.name}</h2>
      </ImageTile>
    );
  }
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
