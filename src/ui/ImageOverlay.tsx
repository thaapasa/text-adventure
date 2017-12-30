import * as React from 'react';
import './ImageOverlay.css';
import { getBackgroundImageStyle } from './ImageTile';

interface ImageOverlayProps {
  image: string;
  onClick?: () => void;
}

export class ImageOverlay extends React.Component<ImageOverlayProps, {}> {

  private click = () => {
    if (this.props.onClick) { this.props.onClick(); }
  }

  public render() {
    return (
      <div className="ImageOverlay" onClick={this.click}>
        <div className="ImageOverlay-image" style={getBackgroundImageStyle(this.props.image)} />
      </div>
    );
  }
}
