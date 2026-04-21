import { Component, CSSProperties, MouseEvent } from "react";
import "./Icons.css";
import iconHome from "../img/icon-home.svg";
import iconChevronLeft from "../img/icon-chevron-left.svg";
import iconChevronRight from "../img/icon-chevron-right.svg";
import iconText from "../img/icon-text.svg";
import iconReload from "../img/icon-reload.svg";
import iconBook from "../img/icon-book.svg";
import iconPhoto from "../img/icon-photo.svg";

const colors = {
  chevron: "#8adba9",
  home: "#3b87f8",
  textSize: "rgb(224, 222, 83)",
  reload: "rgb(144, 195, 255)",
  book: "rgb(218, 177, 236)",
  photo: "rgb(253, 117, 188)",
};

type IconAction = () => void;

interface IconProps {
  readonly icon: string;
  readonly onClick?: IconAction;
  readonly imageStyle?: CSSProperties;
  readonly color?: string;
}

export class Icon extends Component<IconProps> {
  private onClick = (event: MouseEvent<HTMLImageElement>) => {
    if (this.props.onClick) {
      this.props.onClick();
    }
    event.stopPropagation();
  };

  public render() {
    return (
      <div
        className="Icon"
        style={this.props.color ? { backgroundColor: this.props.color } : {}}
      >
        <img
          className="Icon-Image"
          src={this.props.icon}
          onClick={this.onClick}
          style={this.props.imageStyle}
        />
      </div>
    );
  }
}

export default Icon;

export function HomeIcon({ onClick }: { onClick?: IconAction }) {
  return <Icon icon={iconHome} onClick={onClick} color={colors.home} />;
}

export function ChevronLeft({ onClick }: { onClick?: IconAction }) {
  return (
    <Icon
      icon={iconChevronLeft}
      onClick={onClick}
      imageStyle={{ marginLeft: "-3px" }}
      color={colors.chevron}
    />
  );
}

export function ChevronRight({ onClick }: { onClick?: IconAction }) {
  return (
    <Icon
      icon={iconChevronRight}
      onClick={onClick}
      imageStyle={{ marginLeft: "-3px" }}
      color={colors.chevron}
    />
  );
}

export function TextSizeIcon({ onClick }: { onClick?: IconAction }) {
  return <Icon icon={iconText} onClick={onClick} color={colors.textSize} />;
}

export function ReloadIcon({ onClick }: { onClick?: IconAction }) {
  return <Icon icon={iconReload} onClick={onClick} color={colors.reload} />;
}

export function BookIcon({ onClick }: { onClick?: IconAction }) {
  return <Icon icon={iconBook} onClick={onClick} color={colors.book} />;
}

export function PhotoIcon({ onClick }: { onClick?: IconAction }) {
  return <Icon icon={iconPhoto} onClick={onClick} color={colors.photo} />;
}
