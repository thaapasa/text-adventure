import * as React from 'react';
import './GamePage.css';
import { Game, Scene } from '../data/Game';
import Page from './Page';
import { gameService } from '../data/GameService';
import { RouteComponentProps } from 'react-router';
import { SceneView } from './SceneView';
const debug = require('debug')('game:game-page');

interface GamePageProps {
  game: Game;
  sceneId: string | undefined;
}

interface GamePageState {
  scene: Scene | null;
}

export class GamePage extends React.Component<GamePageProps, GamePageState> {
  public state: GamePageState = {
    scene: null,
  };

  public async componentDidMount() {
    await this.loadScene(this.props);
  }

  public async componentWillReceiveProps(next: GamePageProps) {
    await this.loadScene(next);
  }

  private loadScene = async (props: GamePageProps) => {
    const scene = props.sceneId ?
      await gameService.getScene(props.game, props.sceneId) :
      await gameService.getStart(props.game);
    this.setState({ scene });
  }

  public render() {
    return (
      <Page title={this.props.game.name} className="GamePage">
        {this.state.scene ? <SceneView game={this.props.game} scene={this.state.scene} /> : null}
      </Page>
    );
  }
}

interface RoutedGamePageState { 
  game: Game | null; 
}

interface RoutedGamePageProps {
  gameId: string;
  sceneId: string | undefined;
}

export class RoutedGamePage extends React.Component<RouteComponentProps<RoutedGamePageProps>, RoutedGamePageState> {
  public state: RoutedGamePageState = {
    game: null,
  };

  public async componentDidMount() {
    debug('Game page', this.props);
    const game = await gameService.getGame(this.props.match.params.gameId);
    this.setState({ game });
  }

  public render() {
    return this.state.game ? <GamePage game={this.state.game} sceneId={this.props.match.params.sceneId} /> : null;
  }
}
