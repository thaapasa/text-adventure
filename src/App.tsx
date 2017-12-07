import * as React from 'react';
import './App.css';
import { Game } from './data/Game';
import GameSelection from './ui/GameSelection';

const logo = require('./logo.svg');

interface GameState {
  game: Game | null;
}

class App extends React.Component<{}, GameState> {
  public state: GameState = {
    game: null,
  };

  public render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <GameSelection />
      </div>
    );
  }
}

export default App;
