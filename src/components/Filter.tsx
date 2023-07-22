import React from "react";
import ButtonWithIcon from "./ButtonWithIcon";
import Flex from "./Flex";
import Menu from "./Menu";
import Popup from "./Popup";

type button = {
  text: string;
  icon: string;
  key: string;
  setActive: boolean;
};

type filter = {
  list: button[];
  onClick?: (key: string) => void;
};

const Filter: React.FC<filter> = (props) => {
  const { list, onClick } = props;

  const refFlex = React.useRef<HTMLDivElement>(null);
  const [popupActive, setPopupActive] = React.useState<boolean>(false);
  const [active, setActive] = React.useState<button | undefined>(undefined);

  const activeButton =
    active || list.find(({ setActive }) => setActive) || list[0];

  const popupList = list.map((button) => {
    const { key, setActive, ...nextItems } = button;
    return { cbValue: key, ...nextItems };
  });

  const onClickMenuButton = (key: string) => {
    setActive(list.find((button) => button.key === key));
    onClick?.(key);
    setPopupActive(false)
  };

  React.useEffect(() => {
    const onWindowClick = (e: MouseEvent) => {
      if (!refFlex.current) return;
      if (!e.composedPath().includes(refFlex.current)) {
        setPopupActive(false);
      }
    };
    window.addEventListener("click", onWindowClick);
    return () => {
      removeEventListener("click", onWindowClick);
    };
  }, []);

  return (
    <Flex ref={refFlex} width="12em" height="2.5em">
      <Popup
        width="auto"
        height="max-content"
        toggleElement={
          <ButtonWithIcon
            {...activeButton}
            height="2.5em"
            width="100%"
            marginIcon="0 1em"
            onClick={() => setPopupActive((curr) => !curr)}
          />
        }
        popupElement={
          <Menu
            paddingWrapper="0.3em 0"
            padding="1.3em"
            bgColor="#000"
            list={popupList.map((item) => ({
              ...item,
              bgColor: "transparent",
            }))}
            onClick={(key) => onClickMenuButton(key)}
          />
        }
        toggle={popupActive}
      />
    </Flex>
  );
};

export default Filter;
