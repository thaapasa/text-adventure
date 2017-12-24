import * as React from 'react';
import './SceneView.css';
import { Scene, Game } from '../data/Game';
import { ImageTile } from './ImageTile';
import { Link } from 'react-router-dom';
import { gameService } from '../data/GameService';
import { RouteComponentProps } from 'react-router';
const debug = require('debug')('game:scene-view');

export class SceneView extends React.Component<{
  readonly game: Game;
  readonly scene: Scene;
}, {}> {
  public render() {
    return (
      <ImageTile className="Scene" url={this.props.scene.image}>
        <div className="Header"><h3>{this.props.scene.name}</h3></div>
        <div className="Introdution">{this.props.scene.text}</div>
        {this.props.scene.question ? <div className="Question">{this.props.scene.question}</div> : null}
        {this.props.scene.choices && this.props.scene.choices.map(c =>
          <div className="Choice" key={c.sceneId}>
            <Link to={gameService.getSceneLink(this.props.game, c.sceneId)}>{c.text}</Link>
          </div>
        )}
      </ImageTile>
    );
  }
}

interface RoutedSceneViewState {
  game: Game | null;
  scene: Scene | null;
}

export class RoutedScenePage
  extends React.Component<RouteComponentProps<{ gameId: string, sceneId: string }>, 
  RoutedSceneViewState> {

  public state: RoutedSceneViewState = {
    game: null,
    scene: null,
  };

  public async componentDidMount() {
    debug('Scene', this.props);
    const game = await gameService.getGame(this.props.match.params.gameId);
    this.setState({ game, scene: null });
    const scene = await gameService.getScene(game, this.props.match.params.sceneId);
    this.setState({ game, scene });
  }
  
  public render() {
    return this.state.game && this.state.scene ?
      <SceneView game={this.state.game} scene={this.state.scene} /> :
      null;
  }
}
