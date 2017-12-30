import * as React from 'react';
import './ItemBar.css';
import { Item } from '../data/Game';
import { getBackgroundImageStyle } from './ImageTile';

interface ItemBarProps {
  items: Item[];
}

function ItemImage({ item }: { item: Item }) {
  return (
    <div className="ItemBar-Item">
      <div className="ItemBar-Image" style={getBackgroundImageStyle(item.image)} />
    </div>
  );
}

export class ItemBar extends React.Component<ItemBarProps, {}> {

  public render() {
    return (
      <div className="ItemBar">
        {this.props.items.map(i => <ItemImage item={i} key={i.id} />)}
      </div>
    );
  }
}
