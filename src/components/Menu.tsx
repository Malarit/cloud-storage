import React from "react";
import ButtonWithIcon from "./ButtonWithIcon";

export type arr_menu<T> = {
  text: string;
  icon: string;
  cbValue: T;
  bgColor?: string;
  color?: string;
  disableHover?: boolean;
};

type menu = {
  list: arr_menu<any>[];
  onClick?: (cbValue: any) => void;
  element?: JSX.Element;
  marginIcon?: string;
  padding?: string;
  paddingIcon?: string;
  heightIcon?: string;
};

const Menu: React.FC<menu> = React.memo((props) => {
  const {
    list,
    onClick,
    element,
    marginIcon,
    padding,
    paddingIcon,
    heightIcon,
  } = props;
  return (
    <div>
      {element}
      {list.map(({ text, icon, cbValue, bgColor, color, disableHover }, i) => (
        <ButtonWithIcon
          key={i}
          disableHover={disableHover}
          marginIcon={marginIcon || "0 1.5em 0 0"}
          bgColorHover="#ffffff11"
          margin={i > 0 ? "0.5em 0 0 0" : ""}
          onClick={() => onClick?.(cbValue)}
          padding={padding || "1.2em 1em"}
          width={"100%"}
          height={heightIcon || "2em"}
          color={color}
          bgColor={bgColor}
          text={text}
          icon={icon}
          paddingIcon={paddingIcon}
        />
      ))}
    </div>
  );
});

export default Menu;
