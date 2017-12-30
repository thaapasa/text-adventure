import * as React from 'react';
import './IconBar.css';
import { History } from 'history';
import { ChevronLeft, ChevronRight, HomeIcon, TextSizeIcon, ReloadIcon, BookIcon, PhotoIcon } from './Icons';
const debug = require('debug')('game:icon-bar');

interface IconBarProps {
  readonly className?: string;
  readonly history: History;
  readonly resetStory?: () => void;
  readonly showImage?: () => void;
  readonly toggleTextSize?: () => void;
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
    const width = 5 * 60;
    return (
      <div className={'IconBar ' + (this.state.open ? 'open ' : 'closed ') + (this.props.className || '')}>
        <div className="IconBar-expander">
          {this.state.open ? <ChevronRight onClick={this.toggle} /> : <ChevronLeft onClick={this.toggle} />}
        </div>
        <div className="IconBar-icons" style={{ width: this.state.open ? width : 0 }}>
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
