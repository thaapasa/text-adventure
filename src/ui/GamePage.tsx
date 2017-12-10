import * as React from 'react';
import './GamePage.css';
import { Game } from '../data/Game';
import Page from './Page';

interface GamePageProps {
    game: Game;
}

interface GamePageState {
}

export default class GamePage extends React.Component<GamePageProps, GamePageState> {
  public state: GamePageState = {
  };

  public render() {
    return (
      <Page title={this.props.game.name} className="GamePage">  
        Peli
      </Page>
    );
  }
}
