import * as React from 'react';
import './SceneView.css';
import { Scene } from '../data/Game';
import { ImageTile } from './ImageTile';

export default class SceneView extends React.Component<{
  readonly scene: Scene;
  readonly onSelectScene: (sceneId: string) => void;
}, {}> {
  public render() {
    return (
      <ImageTile className="Scene" url={this.props.scene.image}>
        <div className="Header"><h3>{this.props.scene.name}</h3></div>
        <div className="Introdution">{this.props.scene.text}</div>
        {this.props.scene.question ? <div className="Question">{this.props.scene.question}</div> : null}
        {this.props.scene.choices && this.props.scene.choices.map(c =>
          <div className="Choice" key={c.sceneId} onClick={() => this.props.onSelectScene(c.sceneId)}>{c.text}</div>)}
      </ImageTile>
    );
  }
}
