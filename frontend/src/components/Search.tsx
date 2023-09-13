import styled from "styled-components";
import Flex from "./Flex";
import Wrapper from "./Wrapper";
import search from "../assets/menu/search white.svg";
import { theme } from "../Theme";
import React from "react";
import plus from "../assets/menu/plus white.svg";
import Icon from "./Icon";
import ButtonWithIcon from "./ButtonWithIcon";

type search = {
  inputValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickClose?: () => void;
};

const Input = styled.input`
  background-color: transparent;
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 1.2em;
`;

const SearchButtonWithIcon = styled(ButtonWithIcon)`
  & img {
    transform: rotate(45deg);
  }
`;

const Search: React.FC<search> = (props) => {
  const { onChange, onClickClose, inputValue } = props;
  const [active, setActive] = React.useState(false);
  const refComponent = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!refComponent.current) return;
      if (!e.composedPath().includes(refComponent.current)) setActive(false);
    };
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <Wrapper height="100%">
      <Flex height="100%" color="#fff" align="center">
        <Wrapper
          ref={refComponent}
          borderRadius={theme.border.radius}
          border={active ? "1px solid #ffffff73" : ""}
          width="max(45em, 50%)"
          bgColor="#ffffff18"
          height="70%"
        >
          <Flex align="center">
            <Icon width="4em" height="1.5em" src={search} />
            <Input
              value={inputValue}
              onChange={onChange}
              onFocus={() => setActive(true)}
            />
            {active && (
              <SearchButtonWithIcon
                onClick={onClickClose}
                heightIcon="1.5em"
                bgColor="transparent"
                text=""
                icon={plus}
              />
            )}
          </Flex>
        </Wrapper>
      </Flex>
    </Wrapper>
  );
};

export default Search;
