import React from "react";
import styled from "styled-components";

type popupWrapper = {
  children?: React.ReactNode;
  bgColor?: string;
};

type popap = {
  bgColor?: string;
  padding?: string;
  margin?: string;
  width?: string;
  height?: string;
  color?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
};

type popupProps = {
  toggleElement: JSX.Element;
  popupElement: JSX.Element;
  toggle: boolean;
  ref?: React.ForwardedRef<any>;
} & popap;

const PopupWrapper = styled.div<popupWrapper>`
  width: 100%;
  position: relative;
  height: max-content;
  background-color: ${({ bgColor }) => bgColor};
`;

const StyledPopap = styled.div<popap>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  background-color: ${({ bgColor }) => bgColor};
  padding: ${({ padding }) => padding};
  margin: ${({ margin }) => margin};
  color: ${({ color }) => color || "#fff"};
  left: ${({ left }) => left};
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  border-radius: ${({ theme }) => theme.border.radius};
  box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.3),
    0 2px 6px 2px rgba(255, 255, 255, 0.15);
  position: absolute;
`;

const Popup = React.forwardRef<HTMLDivElement, popupProps>((props, ref) => {
  const { toggleElement, popupElement, toggle } = props;
  return (
    <PopupWrapper bgColor={props.bgColor} ref={ref}>
      {toggleElement}
      {toggle && <StyledPopap {...props}>{popupElement}</StyledPopap>}
    </PopupWrapper>
  );
});

export default Popup;
