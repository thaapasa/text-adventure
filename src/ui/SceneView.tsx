import { Component } from "react";
import Markdown from "react-markdown";
import debug from "debug";
import "./SceneView.css";
import { Action, Choice, Condition, Game, Item, Scene } from "../data/Game";
import { gameService } from "../data/GameService";
import { ImageTile } from "./ImageTile";
import { ItemBar } from "./ItemBar";
import { NavigateFn } from "./GamePage";

const log = debug("game:scene-view");

interface ChoiceViewProps {
  readonly choice: Choice;
  readonly navigate: NavigateFn;
  readonly game: Game;
  readonly items: Item[];
}

class ChoiceView extends Component<ChoiceViewProps> {
  private filterItems = (action: Action, items: string[]): string[] => {
    log("Action", action);
    switch (action.type) {
      case "receiveItem":
        return items.find((i) => i === action.item) !== undefined
          ? items
          : items.concat([action.item]);
      case "loseItem":
        return items.filter((i) => i !== action.item);
      default:
        return items;
    }
  };

  private selectLink = () => {
    let items: string[] = this.props.items.map((i) => i.id);
    if (this.props.choice.actions) {
      this.props.choice.actions.forEach((a) => {
        items = this.filterItems(a, items);
      });
    }
    log("Filtered items", items);
    const link = gameService.getSceneLink(
      this.props.game,
      this.props.choice.sceneId,
      items,
    );
    this.props.navigate(link);
  };

  public render() {
    return (
      <div className="Scene-Choice" onClick={this.selectLink}>
        {this.props.choice.text}
      </div>
    );
  }
}

const noChoices: Choice[] = [];

interface SceneViewProps {
  readonly game: Game;
  readonly scene: Scene;
  readonly items: Item[];
  readonly navigate: NavigateFn;
}

export class SceneView extends Component<SceneViewProps> {
  public componentDidMount() {
    log("Scene", this.props.scene, this.props.items);
  }

  private hasItem = (itemId: string): boolean =>
    this.props.items.find((i) => i.id === itemId) !== undefined;

  private matchCondition = (condition: Condition): boolean => {
    switch (condition.type) {
      case "hasItem":
        return this.hasItem(condition.item);
      case "doesNotHaveItem":
        return !this.hasItem(condition.item);
      default:
        return false;
    }
  };

  private canShowChoice = (choice: Choice): boolean => {
    return choice.conditions && choice.conditions.length > 0
      ? choice.conditions.reduce((p, c) => p && this.matchCondition(c), true)
      : true;
  };

  public render() {
    const filteredChoices: Choice[] = this.props.scene.choices
      ? this.props.scene.choices.filter(this.canShowChoice)
      : noChoices;
    return (
      <ImageTile className="Scene" url={this.props.scene.image}>
        <div className="Scene-Header">
          <h3>{this.props.scene.name}</h3>
        </div>
        <div className="Scene-ItemBar-Position">
          <ItemBar items={this.props.items} />
        </div>
        <div className="Scene-Spacer">
          <div className="Scene-Introduction">
            <Markdown>{this.props.scene.text}</Markdown>
          </div>
        </div>
        {this.props.scene.question ? (
          <div className="Scene-Question">
            <span className="Scene-Text">{this.props.scene.question}</span>
          </div>
        ) : null}
        {filteredChoices.length > 0 && (
          <div className="Scene-Choices">
            {filteredChoices.map((c) => (
              <ChoiceView
                choice={c}
                key={c.id}
                navigate={this.props.navigate}
                game={this.props.game}
                items={this.props.items}
              />
            ))}
          </div>
        )}
      </ImageTile>
    );
  }
}
