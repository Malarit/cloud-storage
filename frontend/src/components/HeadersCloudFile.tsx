import React from "react";
import styled from "styled-components";
import Grid from "./Grid";
import Button from "./Button";
import Icon from "./Icon";
import arrow from "../assets/menu/arrow.svg";
import Flex from "./Flex";

const buttonsNamesArr = ["name", "date", "size"] as const;

type buttonsNames = (typeof buttonsNamesArr)[number];

type headersCloudFile = {
  onClick?: (name: buttonsNames) => void;
};

type cloudIcon = {
  active: boolean;
};

const cloudIconAttrs = ({ active }: cloudIcon) => ({
  style: {
    transform: active ? "rotate(180deg)" : "",
  },
});

const CloudIcon = styled(Icon).attrs<cloudIcon>(cloudIconAttrs)<cloudIcon>`
  height: 1vh;
  margin-left: 0.2em;
  transition: all 0.2s ease;
`;

const CloudButton = styled(Button)`
  background-color: transparent;
`;

const CloudGrid = styled(Grid)`
  & > button:not(:first-of-type) {
    margin: 0 auto;
  }
`;

const getInitalState = () => {
  return buttonsNamesArr.reduce((o, key) => ({ ...o, [key]: false }), {}) as {
    [key in buttonsNames]: boolean;
  };
};

const HeadersCloudFile: React.FC<headersCloudFile> = (props) => {
  const [active, setActive] = React.useState(getInitalState());
  const { onClick } = props;

  const onClickButton = (name: buttonsNames) => {
    setActive((curr) => ({ ...curr, [name]: !curr[name] }));
    onClick?.(name);
  };

  return (
    <CloudGrid
      padding="0 0.5em"
      templateColumns="minmax(150px, 1fr) minmax(5em, 20%) minmax(2em, 10%) 10em"
      align="center"
    >
      <CloudButton onClick={() => onClickButton("name")} color="#fff">
        <Flex align="center">
          Название <CloudIcon active={active["name"]} src={arrow} />
        </Flex>
      </CloudButton>
      <CloudButton onClick={() => onClickButton("date")} color="#fff">
        <Flex align="center">
          Дата <CloudIcon active={active["date"]} src={arrow} />
        </Flex>
      </CloudButton>
      <CloudButton onClick={() => onClickButton("size")} color="#fff">
        <Flex align="center">
          Размер <CloudIcon active={active["size"]} src={arrow} />
        </Flex>
      </CloudButton>
    </CloudGrid>
  );
};

export default HeadersCloudFile;
