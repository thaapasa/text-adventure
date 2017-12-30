import * as React from 'react';
import './GamePage.css';
import { Game, Scene, Item } from '../data/Game';
import Page from './Page';
import { gameService } from '../data/GameService';
import { RouteComponentProps } from 'react-router';
import { SceneView } from './SceneView';
import { History } from 'history';
import { ImageOverlay } from './ImageOverlay';
const debug = require('debug')('game:game-page');

interface GamePageProps {
  game: Game;
  sceneId: string | undefined;
  itemIds: string[];
  history: History;
}

interface GamePageState {
  scene: Scene | null;
  items: Item[]; 
  shownImage: string | null;
}

export class GamePage extends React.Component<GamePageProps, GamePageState> {
  public state: GamePageState = {
    scene: null,
    items: [],
    shownImage: null,
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
    this.setState({ scene, items: [] });
    const items = await Promise.all(this.props.itemIds.map(id => gameService.getItem(id)));
    debug('Items', items);
    this.setState({ items });
  }

  private resetGame = () => {
    this.props.history.push(gameService.getGameLink(this.props.game));
  }

  private showImage = () => {
    this.setState(s => ({ shownImage: s.shownImage ? null : (s.scene ? s.scene.image : null) }));
  }

  public render() {
    return (
      <Page 
        title={this.props.game.name} 
        className="GamePage" 
        resetStory={this.resetGame} 
        history={this.props.history}
        showImage={this.showImage}
      >
        {this.state.scene ?
          <SceneView game={this.props.game} scene={this.state.scene}
            history={this.props.history} items={this.state.items} /> :
          null}
        {this.state.shownImage ? <ImageOverlay image={this.state.shownImage} onClick={this.showImage} /> : null}
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
  itemIds: string | undefined;
}

export class RoutedGamePage extends React.Component<RouteComponentProps<RoutedGamePageProps>, RoutedGamePageState> {
  public state: RoutedGamePageState = {
    game: null,
  };

  private getItemIds(): string[] {
    return this.props.match.params.itemIds ? this.props.match.params.itemIds.split('-') : [];
  }

  public async componentDidMount() {
    debug('Game page', this.props);
    const game = await gameService.getGame(this.props.match.params.gameId);
    this.setState({ game });
  }

  public render() {
    return this.state.game ? (
      <GamePage game={this.state.game} sceneId={this.props.match.params.sceneId}
        itemIds={this.getItemIds()} history={this.props.history} /> 
    ) : null;
  }
}
