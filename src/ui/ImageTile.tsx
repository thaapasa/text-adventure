import * as React from 'react';
import { CSSProperties } from 'react';

interface ImageTileProps {
  readonly url?: string | null;
  readonly style?: CSSProperties;
  readonly className?: string;
  readonly onClick?: () => void;
}

const noProps = {};

export function getBackgroundImageStyle(url?: string | null): CSSProperties {
  return url ? { backgroundImage: `url(${JSON.stringify(url)}` } : noProps;
}

export class ImageTile extends React.Component<ImageTileProps, {}> {
  public render() {
    return (
      <div className={this.props.className} onClick={this.props.onClick} style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...this.props.style,
        ...getBackgroundImageStyle(this.props.url),
      }}>
        {this.props.children}
      </div>
    );
  }
}
