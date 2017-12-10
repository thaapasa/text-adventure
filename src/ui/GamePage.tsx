import * as React from 'react';
import './GamePage.css';
import { Game, Scene } from '../data/Game';
import Page from './Page';
import { gameService } from '../data/GameService';
import SceneView from './SceneView';

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

  private selectScene = async (sceneId: string) => {
    const scene = await gameService.getScene(this.props.game, sceneId);
    this.setState({ scene });
  }

  public render() {
    return (
      <Page title={this.props.game.name} className="GamePage">  
        {this.state.scene ? <SceneView scene={this.state.scene} onSelectScene={this.selectScene}/> : null}
      </Page>
    );
  }
}
