import { Component, CSSProperties, ReactNode } from "react";
import "./Page.css";
import { IconBar } from "./IconBar";
import { NavigateFn } from "./GamePage";

interface PageProps {
  readonly title: string;
  readonly className?: string;
  readonly navigate: NavigateFn;
  readonly allowScroll?: boolean;
  readonly resetStory?: () => void;
  readonly showImage?: () => void;
  readonly children?: ReactNode;
}

interface PageState {
  allCaps: boolean;
}

const scrollStyle: CSSProperties = { overflowY: "auto" };
const noStyle: CSSProperties = {};

export default class Page extends Component<PageProps, PageState> {
  public state: PageState = { allCaps: false };

  private toggleTextSize = () => {
    this.setState((s) => ({ allCaps: !s.allCaps }));
  };

  public render() {
    return (
      <div
        className={
          "Page " +
          (this.state.allCaps ? "all-caps " : "") +
          (this.props.className || "")
        }
        style={this.props.allowScroll ? scrollStyle : noStyle}
      >
        <div className="Page-Header">
          <div className="Page-Title">
            <h1>{this.props.title}</h1>
          </div>
          <IconBar
            className="Page-Icons"
            navigate={this.props.navigate}
            toggleTextSize={this.toggleTextSize}
            resetStory={this.props.resetStory}
            showImage={this.props.showImage}
          />
        </div>
        <div className="Page-Content">{this.props.children}</div>
      </div>
    );
  }
}
