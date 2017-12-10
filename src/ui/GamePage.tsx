import * as React from 'react';
import './GamePage.css';
import { Game, Scene } from '../data/Game';
import Page from './Page';
import { gameService } from '../data/GameService';

interface GamePageProps {
  game: Game;
}

interface GamePageState {
  scene: Scene | null;
}

export default class GamePage extends React.Component<GamePageProps, GamePageState> {
  public state: GamePageState = {
    scene: null,
  };

  public async componentWillMount() {
    const scene = await gameService.getStart(this.props.game);
    this.setState({ scene });
  }

  public render() {
    return (
      <Page title={this.props.game.name} className="GamePage">  
        {this.state.scene ? <SceneView {...this.state.scene}/> : null}
      </Page>
    );
  }
}

class SceneView extends React.Component<Scene, {}> {
  public render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <div>{this.props.text}</div>
        {this.props.question ? <div>{this.props.question}</div> : null}
        {this.props.choices.map(c => <div key={c.sceneId}>{c.text}</div>)}
      </div>
    );
  }
}
