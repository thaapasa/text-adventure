import { Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import debug from 'debug';
import './GamePage.css';
import { Game, Item, Scene } from '../data/Game';
import { gameService } from '../data/GameService';
import Page from './Page';
import { SceneView } from './SceneView';
import { ImageOverlay } from './ImageOverlay';

const log = debug('game:game-page');

export type NavigateFn = (path: string) => void;

interface GamePageProps {
  game: Game;
  sceneId: string | undefined;
  itemIds: string[];
  navigate: NavigateFn;
}

interface GamePageState {
  scene: Scene | null;
  items: Item[];
  shownImage: string | null;
}

export class GamePage extends Component<GamePageProps, GamePageState> {
  public state: GamePageState = {
    scene: null,
    items: [],
    shownImage: null,
  };

  public async componentDidMount() {
    await this.loadScene(this.props);
  }

  public async componentDidUpdate(prev: GamePageProps) {
    if (
      prev.sceneId !== this.props.sceneId ||
      prev.game.id !== this.props.game.id ||
      prev.itemIds.join('-') !== this.props.itemIds.join('-')
    ) {
      await this.loadScene(this.props);
    }
  }

  private loadScene = async (props: GamePageProps) => {
    const scene = props.sceneId
      ? await gameService.getScene(props.game, props.sceneId)
      : await gameService.getStart(props.game);
    const items = await Promise.all(
      props.itemIds.map((id) => gameService.getItem(id)),
    );
    this.setState({ scene, items });
  };

  private resetGame = () => {
    this.props.navigate(gameService.getGameLink(this.props.game));
  };

  private showImage = () => {
    this.setState((s) => ({
      shownImage: s.shownImage ? null : s.scene ? s.scene.image : null,
    }));
  };

  public render() {
    return (
      <Page
        title={this.props.game.name}
        className="GamePage"
        resetStory={this.resetGame}
        navigate={this.props.navigate}
        showImage={this.showImage}
      >
        {this.state.scene ? (
          <SceneView
            game={this.props.game}
            scene={this.state.scene}
            navigate={this.props.navigate}
            items={this.state.items}
          />
        ) : null}
        {this.state.shownImage ? (
          <ImageOverlay
            image={this.state.shownImage}
            onClick={this.showImage}
          />
        ) : null}
      </Page>
    );
  }
}

interface RoutedGamePageHostProps {
  gameId: string;
  sceneId: string | undefined;
  itemIds: string[];
  navigate: NavigateFn;
}

class RoutedGamePageHost extends Component<
  RoutedGamePageHostProps,
  { game: Game | null }
> {
  public state = { game: null as Game | null };

  public async componentDidMount() {
    log('Game page', this.props);
    const game = await gameService.getGame(this.props.gameId);
    this.setState({ game });
  }

  public async componentDidUpdate(prev: RoutedGamePageHostProps) {
    if (prev.gameId !== this.props.gameId) {
      const game = await gameService.getGame(this.props.gameId);
      this.setState({ game });
    }
  }

  public render() {
    return this.state.game ? (
      <GamePage
        game={this.state.game}
        sceneId={this.props.sceneId}
        itemIds={this.props.itemIds}
        navigate={this.props.navigate}
      />
    ) : null;
  }
}

export function RoutedGamePage() {
  const params = useParams<{
    gameId: string;
    sceneId?: string;
    itemIds?: string;
  }>();
  const navigate = useNavigate();
  const itemIds = params.itemIds ? params.itemIds.split('-') : [];
  if (!params.gameId) {
    return null;
  }
  return (
    <RoutedGamePageHost
      gameId={params.gameId}
      sceneId={params.sceneId}
      itemIds={itemIds}
      navigate={(path) => navigate(path)}
    />
  );
}
