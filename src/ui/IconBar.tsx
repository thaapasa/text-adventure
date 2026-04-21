import { Component } from "react";
import debug from "debug";
import "./IconBar.css";
import {
  BookIcon,
  ChevronLeft,
  ChevronRight,
  HomeIcon,
  PhotoIcon,
  ReloadIcon,
  TextSizeIcon,
} from "./Icons";
import { NavigateFn } from "./GamePage";

const log = debug("game:icon-bar");

interface IconBarProps {
  readonly className?: string;
  readonly navigate: NavigateFn;
  readonly resetStory?: () => void;
  readonly showImage?: () => void;
  readonly toggleTextSize?: () => void;
}

interface IconBarState {
  open: boolean;
}

export class IconBar extends Component<IconBarProps, IconBarState> {
  public state: IconBarState = {
    open: false,
  };

  private goHome = () => {
    log("Go home");
    this.props.navigate("/g/pelit");
  };

  private toggle = () => {
    this.setState((s) => ({ open: !s.open }));
  };

  private reload = () => {
    document.location.reload();
  };

  public render() {
    const width = 5 * 60;
    return (
      <div
        className={
          "IconBar " +
          (this.state.open ? "open " : "closed ") +
          (this.props.className || "")
        }
      >
        <div className="IconBar-expander">
          {this.state.open ? (
            <ChevronRight onClick={this.toggle} />
          ) : (
            <ChevronLeft onClick={this.toggle} />
          )}
        </div>
        <div
          className="IconBar-icons"
          style={{ width: this.state.open ? width : 0 }}
        >
          <HomeIcon onClick={this.goHome} />
          <BookIcon onClick={this.props.resetStory} />
          <PhotoIcon onClick={this.props.showImage} />
          <TextSizeIcon onClick={this.props.toggleTextSize} />
          <ReloadIcon onClick={this.reload} />
        </div>
      </div>
    );
  }
}
