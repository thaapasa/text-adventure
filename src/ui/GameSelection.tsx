import * as React from 'react';
import './GameSelection.css';
import Page from './Page';
import { Game } from '../data/Game';
import { gameService } from '../data/GameService';
import { ImageTile } from './ImageTile';
import { Link } from 'react-router-dom';
const debug = require('debug')('game:selection');

interface GameSelectionState {
  games: Game[]; 
}

class GameIcon extends React.Component<Game, {}> {
  public render() {
    return (
      <ImageTile className="Game" url={this.props.image}>
        <h2 className="GameTitle"><Link to={`/${this.props.id}`}>{this.props.name}</Link></h2>
      </ImageTile>
    );
  }
}

export default class GameSelection extends React.Component<{}, GameSelectionState> {
  public state: GameSelectionState = {
    games: [],
  };

  public async componentWillMount() {
    const games = await gameService.getGames();
    this.setState({ games });
    debug('Game list', games);
  }

  public render() {
    return (
      <Page title="Pelit" className="GameSelection">
        {this.state.games.map(g =>
          <GameIcon {...g} key={g.id} />)}
      </Page>
    );
  }
}
