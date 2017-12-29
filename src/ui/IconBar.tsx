import * as React from 'react';
import './IconBar.css';
import { History } from 'history';
import { MouseEvent } from 'react';
const debug = require('debug')('game:icon-bar');

interface IconProps {
  readonly icon: string;
  readonly onClick?: () => void;
}

class Icon extends React.Component<IconProps, {}> {
  private onClick = (event: MouseEvent<HTMLImageElement>) => {
    if (this.props.onClick) { this.props.onClick(); }
    event.stopPropagation();
  }

  public render() {
    return <img className="Icon" src={this.props.icon} onClick={this.onClick} />;
  }
}

export class IconBar extends React.Component<{ className?: string, history: History }, {}> {
  private goHome = () => {
    debug('Go home');
    this.props.history.push('/g/pelit');
  }

  public render() {
    return (
      <div className={'IconBar ' + (this.props.className || '')}>
        <Icon icon={require('../img/icon-home.png')} onClick={this.goHome} />
      </div>
    );
  }
}
