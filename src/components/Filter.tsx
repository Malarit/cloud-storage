import styled from "styled-components";
import Button from "./Button";
import Flex from "./Flex";
import Menu from "./Menu";
import Popup from "./Popup";
import ButtonWithIcon from "./ButtonWithIcon";

type menu = React.ComponentProps<typeof Menu>["list"];

type filter = {
  buttons: {
    text: string;
    popup: menu;
    toggle: boolean;
  }[];
};

const Filter: React.FC<filter> = (props) => {
  const { buttons } = props;

  return (
    <Flex width="max-content">
      {buttons.map(({ text, popup, toggle }, i) => (
        <Popup
          key={i}
          width="auto"
          toggleElement={
            <ButtonWithIcon
              marginIcon="0 1em 0 0"
              icon={""}
              text={text}
              height="2.2em"
              margin={i > 0 ? "0 0 0 1em" : ""}
            />
          }
          popupElement={
            <Menu
              bgColor="#000"
              padding="1.5em"
              list={popup.map((item) => ({ ...item, bgColor: "#000" }))}
            />
          }
          toggle={toggle}
        />
      ))}
    </Flex>
  );
};

export default Filter;
