import React from "react";
import { observer } from "mobx-react-lite";
import Screens, { screens } from "../../store/screens";

import plus from "../../assets/menu/plus white.svg";
import profile from "../../assets/menu/profile white.svg";
import cloud from "../../assets/menu/cloud white.svg";
import recent from "../../assets/menu/recent white.svg";
import createFolder from "../../assets/menu/create folder white.svg";
import uloadFile from "../../assets/menu/upload file white.svg";
import uploadFolder from "../../assets/menu/upload folder white.svg";

import Menu, { arr_menu } from "../../components/Menu";
import ButtonWithIcon from "../../components/ButtonWithIcon";
import Popup from "../../components/Popup";
import files, { modals } from "../../store/files";

const arrMenu: arr_menu<screens>[] = [
  {
    text: "Облако",
    icon: cloud,
    cbValue: "cloud",
    bgColor: "transparent",
  },
  {
    text: "Корзина",
    icon: recent,
    cbValue: "trash",
    bgColor: "transparent",
  },
  {
    text: "Профиль",
    icon: profile,
    cbValue: "profile",
    bgColor: "transparent",
  },
];

const popupMenu: arr_menu<modals>[] = [
  {
    text: "Создать папку",
    icon: createFolder,
    cbValue: "new folder",
    bgColor: "transparent",
  },
  {
    text: "Загрузить файлы",
    icon: uloadFile,
    cbValue: "upload file",
    bgColor: "transparent",
  },
  {
    text: "Загрузить папку",
    icon: uploadFolder,
    cbValue: "upload folder",
    bgColor: "transparent",
  },
];

const MenuContainer: React.FC = observer(() => {
  const refPopap = React.useRef<HTMLDivElement>(null);
  const [toggle, setToggle] = React.useState(false);
  const newMenu = arrMenu.map((item) =>
    item.cbValue === Screens.activeScreen
      ? { ...item, bgColor: "", disableHover: true }
      : item
  );

  function onCLickMenu(cbValue: screens) {
    Screens.setActiveScreen(cbValue);
  }

  function onCLickPopup(cbValue: modals) {
    files.setActiveModal(cbValue);
    setToggle(false);
  }

  React.useEffect(() => {
    const clickWindow = (e: MouseEvent) => {
      if (!refPopap.current) return;
      const path = e.composedPath().includes(refPopap.current);
      if (!path) setToggle(false);
    };
    window.addEventListener("click", clickWindow);
    return () => window.removeEventListener("click", clickWindow);
  }, []);

  const menuElement = (
    <Popup
      ref={refPopap}
      top="0"
      bgColor="#000"
      height="max-content"
      padding="0.1em 0"
      toggle={toggle}
      popupElement={
        <Menu
          onClick={onCLickPopup}
          heightIcon="3em"
          paddingIcon="0 2em"
          padding="0"
          list={popupMenu}
        />
      }
      toggleElement={
        <ButtonWithIcon
          marginIcon="0 1.5em 0 0"
          margin="0 0 2em 0"
          height="3em"
          width="60%"
          padding="1.2em 1em"
          text={"Создать"}
          icon={plus}
          onClick={() => setToggle((curr) => !curr)}
        />
      }
    />
  );

  return <Menu element={menuElement} onClick={onCLickMenu} list={newMenu} />;
});

export default MenuContainer;
