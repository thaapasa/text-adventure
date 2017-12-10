import * as React from 'react';
import './App.css';
import { Game } from './data/Game';
import GameSelection from './ui/GameSelection';

interface GameState {
  game: Game | null;
}

class App extends React.Component<{}, GameState> {
  public state: GameState = {
    game: null,
  };

  private selectGame = (game: Game) => {
    this.setState({ game });
  } 

  public render() {
    return (
      <div className="App">
        {this.state.game ? null : <GameSelection onSelectGame={this.selectGame} />}
      </div>
    );
  }
}

export default App;
