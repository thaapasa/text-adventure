import * as React from 'react';
import './IconBar.css';
import { History } from 'history';
const debug = require('debug')('game:icon-bar');

function Icon({ icon, onClick }: { icon: string, onClick?: () => void }) {
  return <img className="Icon" src={icon} onClick={onClick} />;
}

export class IconBar extends React.Component<{ className?: string, history: History }, {}> {
  private goHome = () => {
    debug('Go home');
    document.location.href = '/';
  }
  public render() {
    return (
      <div className={'IconBar ' + (this.props.className || '')}>
        <Icon icon={require('../img/icon-home.png')} onClick={this.goHome} />
      </div>
    );
  }
}
