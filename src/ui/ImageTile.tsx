import * as React from 'react';
import { CSSProperties } from 'react';

interface ImageTileProps {
  readonly url?: string | null;
  readonly style?: CSSProperties;
  readonly className?: string;
  readonly onClick?: () => void;
}

export class ImageTile extends React.Component<ImageTileProps, {}> {
  public render() {
    return (
      <div className={this.props.className} onClick={this.props.onClick} style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...this.props.style,
        ...(this.props.url ? { backgroundImage: `url(${JSON.stringify(this.props.url)}` } : null),
      }}>
        {this.props.children}
      </div>
    );
  }
}
