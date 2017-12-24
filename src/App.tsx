import * as React from 'react';
import './App.css';
import { Game } from './data/Game';
import GameSelection from './ui/GameSelection';
import { RoutedGamePage } from './ui/GamePage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router';

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
          <Switch>
            <Route exact={true} path="/:gameId/:sceneId" component={RoutedGamePage} />
            <Route exact={true} path="/:gameId" component={RoutedGamePage} />
            <Route exact={true} path="/" component={GameSelection} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
