import * as React from 'react';
import './Page.css';
import { IconBar } from './IconBar';
import { History } from 'history';

interface PageProps {
  readonly title: string;
  readonly className?: string;
  readonly history: History;
  readonly allowScroll?: boolean;
  readonly resetStory?: () => void;
}

interface PageState {
  allCaps: boolean;
}

export default class Page extends React.Component<PageProps, PageState> {
  public state: PageState = { allCaps: false };

  private toggleTextSize = () => {
    this.setState(s => ({ allCaps: !s.allCaps }));
  }

  public render() {
    return (
      <div className={'Page ' + (this.state.allCaps ? 'all-caps ' : '') + (this.props.className || '')}
        style={this.props.allowScroll ? allowScroll : noStyle}>
        <div className="Page-Header">
          <div className="Page-Title"><h1>{this.props.title}</h1></div>
          <IconBar className="Page-Icons"
            history={this.props.history}
            toggleTextSize={this.toggleTextSize}
            resetStory={this.props.resetStory}
            />
        </div>
        <div className="Page-Content">{this.props.children}</div>
      </div>
    );
  }
}

const allowScroll = { overflowY: 'auto' };
const noStyle = {};
