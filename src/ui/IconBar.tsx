import * as React from 'react';
import './IconBar.css';
import { History } from 'history';
import { ChevronLeft, ChevronRight, HomeIcon, TextSizeIcon, ReloadIcon, BookIcon } from './Icons';
const debug = require('debug')('game:icon-bar');

interface IconBarProps {
  readonly className?: string;
  readonly history: History;
  readonly resetStory?: () => void;
  readonly toggleTextSize: () => void;
}

interface IconBarState {
  open: boolean;
}

export class IconBar extends React.Component<IconBarProps, IconBarState> {
  public state: IconBarState = {
    open: false,
  };

  private goHome = () => {
    debug('Go home');
    this.props.history.push('/g/pelit');
  }

  private toggle = () => {
    this.setState(s => ({ open: !s.open }));
  }

  private reload = () => {
    document.location.reload();
  }

  public render() {
    return (
      <div className={'IconBar ' + (this.state.open ? 'open ' : 'closed ') + (this.props.className || '')}>
        <div className="IconBar-expander">
          {this.state.open ? <ChevronRight onClick={this.toggle} /> : <ChevronLeft onClick={this.toggle} />}
        </div>
        <div className="IconBar-icons">
          <HomeIcon onClick={this.goHome} />
          <BookIcon onClick={this.props.resetStory} />
          <TextSizeIcon onClick={this.props.toggleTextSize} />
          <ReloadIcon onClick={this.reload} />
        </div>
      </div>
    );
  }
}
