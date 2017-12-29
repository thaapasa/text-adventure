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
        <div className="Page-Header" onClick={this.props.onTitleClick}>
          <div className="Page-Title"><h1>{this.props.title}</h1></div>
          <IconBar className="Page-Icons" history={this.props.history} />
        </div>
        <div className="Page-Content">{this.props.children}</div>
      </div>
    );
  }
}
