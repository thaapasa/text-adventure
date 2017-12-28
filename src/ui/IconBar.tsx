import * as React from 'react';
import './IconBar.css';
import { History } from 'history';
import { MouseEvent } from 'react';
const debug = require('debug')('game:icon-bar');

function Icon({ icon, onClick }: {
  readonly icon: string,
  readonly onClick?: (event: MouseEvent<HTMLImageElement>) => void,
}) {
  return <img className="Icon" src={icon} onClick={onClick} />;
}

export class IconBar extends React.Component<{ className?: string, history: History }, {}> {
  private goHome = (event: MouseEvent<HTMLImageElement>) => {
    debug('Go home');
    this.props.history.push('/g/pelit');
    event.stopPropagation();
  }
  public render() {
    return (
      <div className={'IconBar ' + (this.props.className || '')}>
        <Icon icon={require('../img/icon-home.png')} onClick={this.goHome} />
      </div>
    );
  }
}
