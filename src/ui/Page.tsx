import * as React from 'react';
import './Page.css';

export default class Page extends React.Component<{
  readonly title: string;
  readonly className?: string;
}, {}> {
  public render() {
    return (
      <div className={'Page ' + (this.props.className || '')}>
        <div className="Header">
          <h1>{this.props.title}</h1>
        </div>
        <div className="Content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
