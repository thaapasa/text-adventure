import * as React from 'react';
import './SceneView.css';
import { Scene, Game } from '../data/Game';
import { ImageTile } from './ImageTile';
import { gameService } from '../data/GameService';
import * as Markdown from 'react-markdown';
import { History } from 'history';

class Choice extends React.Component<{ history: History, title: string, link: string }, {}> {
  private selectLink = () => {
    this.props.history.push(this.props.link);
  }
  public render() {
    return (
      <div className="Choice" onClick={this.selectLink}>
        {this.props.title}
      </div>
    );
  }
}

export class SceneView extends React.Component<{
  readonly game: Game;
  readonly scene: Scene;
  readonly history: History;
}, {}> {
  public render() {
    return (
      <ImageTile className="Scene" url={this.props.scene.image}>
        <div className="Header"><h3>{this.props.scene.name}</h3></div>
        <div className="Introduction"><Markdown source={this.props.scene.text} /></div>
        {this.props.scene.question ?
          <div className="Question"><span className="Text">{this.props.scene.question}</span></div> :
          null}
        {this.props.scene.choices && this.props.scene.choices.map(c =>
          <Choice
            key={c.sceneId}
            history={this.props.history}
            title={c.text}
            link={gameService.getSceneLink(this.props.game, c.sceneId)} />
        )}
      </ImageTile>
    );
  }
}
