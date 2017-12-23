import * as React from 'react';
import './GamePage.css';
import { Game, Scene } from '../data/Game';
import Page from './Page';
import { gameService } from '../data/GameService';
import SceneView from './SceneView';
import { RouteComponentProps } from 'react-router';

interface GamePageProps {
  game: Game;
}

interface GamePageState {
  scene: Scene | null;
}

export class GamePage extends React.Component<GamePageProps, GamePageState> {
  public state: GamePageState = {
    scene: null,
  };

  public componentDidMount() {
    this.reset();
  }

  private reset = async () => {
    const scene = await gameService.getStart(this.props.game);
    this.setState({ scene });
  }

  private selectScene = async (sceneId: string) => {
    const scene = await gameService.getScene(this.props.game, sceneId);
    this.setState({ scene });
  }

  public render() {
    return (
      <Page title={this.props.game.name} className="GamePage" onTitleClick={this.reset}>  
        {this.state.scene ? <SceneView scene={this.state.scene} onSelectScene={this.selectScene}/> : null}
      </Page>
    );
  }
}

interface RoutedGamePageState { 
  game: Game | null; 
}

export class RoutedGamePage extends React.Component<RouteComponentProps<{ gameId: string }>, RoutedGamePageState> {
  public state: RoutedGamePageState = {
    game: null,
  };

  public async componentDidMount() {
    const game = await gameService.getGame(this.props.match.params.gameId);
    this.setState({ game });
  }

  public render() {
    return this.state.game ? <GamePage game={this.state.game} /> : null;
  }
}
