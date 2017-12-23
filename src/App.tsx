import * as React from 'react';
import './App.css';
import { Game } from './data/Game';
import GameSelection from './ui/GameSelection';
import { RoutedGamePage } from './ui/GamePage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

interface GameState {
  game: Game | null;  
}

class App extends React.Component<{}, GameState> {
  public state: GameState = {
    game: null,
  };

  public render() {
    return (
      <Router>
        <div className="App">
          <Route exact={true} path="/" component={GameSelection} />
          <Route path="/:gameId" component={RoutedGamePage} />
        </div>
      </Router>
    );
  }
}

export default App;
