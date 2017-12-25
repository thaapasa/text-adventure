import * as React from 'react';
import './SceneView.css';
import { Scene, Game } from '../data/Game';
import { ImageTile } from './ImageTile';
import { Link } from 'react-router-dom';
import { gameService } from '../data/GameService';
import * as Markdown from 'react-markdown';

export class SceneView extends React.Component<{
  readonly game: Game;
  readonly scene: Scene;
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
          <div className="Choice" key={c.sceneId}>
            <Link to={gameService.getSceneLink(this.props.game, c.sceneId)}>{c.text}</Link>
          </div>
        )}
      </ImageTile>
    );
  }
}
