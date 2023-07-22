import styled from "styled-components";

type modal = {
  children?: React.ReactNode;
  top?: string;
  left?: string;
  width: string;
  height: string;
  color?: string;
  padding?: string;
};

const Modal = styled.div<modal>`
  position: absolute;
  z-index: 3;
  color: ${({ color }) => color};
  padding: ${({ padding }) => padding || "1em"};
  top: ${({ top, height }) => top || `calc(50% - ${height} / 2)`};
  left: ${({ left, width }) => left || `calc(50% - ${width} / 2)`};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ theme }) => theme.border.radius};
  box-shadow: 0 1px 2px 0 rgba(255, 255, 255, 0.3),
    0 2px 6px 2px rgba(255, 255, 255, 0.15);
`;

export default Modal;
