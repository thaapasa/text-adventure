import * as React from 'react';
import './App.css';
import { Game } from './data/Game';
import GameSelection from './ui/GameSelection';
import { RoutedGamePage } from './ui/GamePage';
import { Router, Route } from 'react-router-dom';
import { Switch } from 'react-router';
import configureHistory from './History';

interface GameState {
  game: Game | null;  
}

const history = configureHistory();

class App extends React.Component<{}, GameState> {
  public state: GameState = {
    game: null,
  };

  public render() {
    return (
      <div className="LayoutBg">
        <div className="LayoutHeader" />
        <div className="LayoutMain">
          <Router history={history}>
            <div className="App">
              <div className="LayoutFlowerBorder" />
              <Switch>
                <Route exact={true} path="/" component={GameSelection} />
                <Route exact={true} path="/g/pelit" component={GameSelection} />
                <Route exact={true} path="/g/:gameId/:sceneId/:itemIds" component={RoutedGamePage} />
                <Route exact={true} path="/g/:gameId/:sceneId" component={RoutedGamePage} />
                <Route exact={true} path="/g/:gameId" component={RoutedGamePage} />
              </Switch>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
