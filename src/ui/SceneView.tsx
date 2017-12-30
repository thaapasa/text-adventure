import * as React from 'react';
import './SceneView.css';
import { Scene, Game, Item, Choice, Condition, Action } from '../data/Game';
import { ImageTile } from './ImageTile';
import { gameService } from '../data/GameService';
import * as Markdown from 'react-markdown';
import { History } from 'history';
import { ItemBar } from './ItemBar';
const debug = require('debug')('game:scene-view');

interface ChoiceViewProps {
  readonly choice: Choice;
  readonly history: History;
  readonly game: Game;
  readonly items: Item[];
}

class ChoiceView extends React.Component<ChoiceViewProps, {}> {
  private filterItems = (action: Action, items: string[]): string[] => {
    debug('Action', action);
    switch (action.type) {
      case 'receiveItem': return items.find(i => i === action.item) !== undefined ?
        items : items.concat([ action.item ]);
      case 'loseItem': return items.filter(i => i !== action.item);
      default: return items;
    }
  }
  private selectLink = () => {
    let items: string[] = this.props.items.map(i => i.id);
    if (this.props.choice.actions) {
      this.props.choice.actions.forEach(a => {
        items = this.filterItems(a, items);
      });
    }
    debug('Filtered items', items);
    const link = gameService.getSceneLink(this.props.game, this.props.choice.sceneId, items);
    this.props.history.push(link);
  }
  public render() {
    return (
      <div className="Scene-Choice" onClick={this.selectLink}>
        {this.props.choice.text}
      </div>
    );
  }
}

const noChoices: Choice[] = [];

export class SceneView extends React.Component<{
  readonly game: Game;
  readonly scene: Scene;
  readonly items: Item[];
  readonly history: History;
}, {}> {

  public componentDidMount() {
    debug('Scene', this.props.scene, this.props.items);
  }

  private hasItem = (itemId: string): boolean => this.props.items.find(i => i.id === itemId) !== undefined;

  private matchCondition = (condition: Condition): boolean => {
    switch (condition.type) {
      case 'hasItem': return this.hasItem(condition.item);
      case 'doesNotHaveItem': return !this.hasItem(condition.item);
      default: return false;
    }
  }

  private canShowChoice = (choice: Choice): boolean => {
    return choice.conditions && choice.conditions.length > 0 ?
      choice.conditions.reduce((p, c) => p && this.matchCondition(c), true) : true;
  }

  public render() {
    const filteredChoices: Choice[] = this.props.scene.choices ?
      this.props.scene.choices.filter(this.canShowChoice) : noChoices;
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
        {filteredChoices.length > 0 && <div className="Scene-Choices">{filteredChoices.map(c =>
          <ChoiceView
            choice={c}
            key={c.id}
            history={this.props.history}
            game={this.props.game}
            items={this.props.items}
            />
        )}</div>}
      </ImageTile>
    );
  }
}
