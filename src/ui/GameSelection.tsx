import * as React from 'react';
import './GameSelection.css';
import Page from './Page';
import { Game } from '../data/Game';
import { gameService } from '../data/GameService';
import { ImageTile } from './ImageTile';
import { History } from 'history';
import { RouteComponentProps } from 'react-router';
const debug = require('debug')('game:selection');

interface GameSelectionState {
  games: Game[]; 
}

class GameIcon extends React.Component<Game & { history: History }, {}> {
  private selectGame = () => {
    if (this.props.startSceneId) {
      this.props.history.push(gameService.getGameLink(this.props));
    }
  }
  public render() {
    return (
      <ImageTile className="Game" url={this.props.image} onClick={this.selectGame}>
        <h2 className="GameTitle">{this.props.name}</h2>
      </ImageTile>
    );
  }
}

export default class GameSelection extends React.Component<RouteComponentProps<{}>, GameSelectionState> {
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
      <Page title="Pelit" className="GameSelection" history={this.props.history}>
        <div className="GameIconArea">
          {this.state.games.map(g =>
            <GameIcon {...g} key={g.id} history={this.props.history} />)}
        </div>
      </Page>
    );
  }
}
