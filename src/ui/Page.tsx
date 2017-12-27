import * as React from 'react';
import './Page.css';
import { IconBar } from './IconBar';
import { History } from 'history';

export default class Page extends React.Component<{
  readonly title: string;
  readonly className?: string;
  readonly history: History;
  readonly onTitleClick?: () => void;
}, {}> {
  public render() {
    return (
      <div className={'Page ' + (this.props.className || '')}>
        <div className="Header" onClick={this.props.onTitleClick}>
          <h1>{this.props.title}</h1>
          <IconBar className="PageIcons" history={this.props.history} />
        </div>
        <div className="Content">{this.props.children}</div>
      </div>
    );
  }
}
