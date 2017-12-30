import * as React from 'react';
import './SceneView.css';
import { Scene, Game, Item } from '../data/Game';
import { ImageTile } from './ImageTile';
import { gameService } from '../data/GameService';
import * as Markdown from 'react-markdown';
import { History } from 'history';
import { ItemBar } from './ItemBar';
const debug = require('debug')('game:scene-view');

class Choice extends React.Component<{ history: History, title: string, link: string }, {}> {
  private selectLink = () => {
    this.props.history.push(this.props.link);
  }
  public render() {
    return (
      <div className="Scene-Choice" onClick={this.selectLink}>
        {this.props.title}
      </div>
    );
  }
}

export class SceneView extends React.Component<{
  readonly game: Game;
  readonly scene: Scene;
  readonly items: Item[];
  readonly history: History;
}, {}> {

  public componentDidMount() {
    debug('Scene', this.props.scene, this.props.items);
  }

  public render() {
    return (
      <ImageTile className="Scene" url={this.props.scene.image}>
        <div className="Scene-Header"><h3>{this.props.scene.name}</h3></div>
        <div className="Scene-ItemBar-Position">
          <ItemBar items={this.props.items}/>
        </div>
        <div className="Scene-Spacer">
          <div className="Scene-Introduction"><Markdown source={this.props.scene.text} /></div>
        </div>
        {this.props.scene.question ?
          <div className="Scene-Question"><span className="Scene-Text">{this.props.scene.question}</span></div> :
          null}
        {this.props.scene.choices && <div className="Scene-Choices">{this.props.scene.choices.map(c =>
          <Choice
            key={c.sceneId}
            history={this.props.history}
            title={c.text}
            link={gameService.getSceneLink(this.props.game, c.sceneId, this.props.items.map(i => i.id))} />
        )}</div>}
      </ImageTile>
    );
  }
}
