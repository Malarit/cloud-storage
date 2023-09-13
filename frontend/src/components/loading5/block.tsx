import React from "react";
import styled from "styled-components";
import { block } from "./types";

const styledBlockAttrs = (props: block) => {
  const { colorActive, size, sizeBlock, rotate, transformActive } = props;
  const transform = `rotate(${rotate}deg) translateX(calc((${size} - ${sizeBlock}) / 2)`;
  return {
    style: {
      transform: transformActive && transform,
      backgroundColor: colorActive,
    },
  };
};

const StyledBlock = styled.div.attrs<block>(styledBlockAttrs)<block>`
  position: absolute;
  background-color: ${({ color }) => color || "#fff"};
  width: ${({ sizeBlock }) => sizeBlock};
  height: ${({ sizeBlock }) => sizeBlock};
  transform: ${({ rotate }) => `rotate(${rotate}deg)`};
  transition: ${({ transition }) => `all ${transition || 0.5}s ease`};
  border-radius: 50%;
`;

const Block = React.memo<block>((props) => <StyledBlock {...props} />);

export default Block;
