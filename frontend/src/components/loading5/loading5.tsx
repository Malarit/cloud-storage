import React from "react";
import styled from "styled-components";
import { Loading, loadingProps } from "./types";
import Block from "./block";

const StyledLoading = styled.div<Loading>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;

const Loading5: React.FC<loadingProps> = (props) => {
  const { count, delay } = props;
  const activeNumbers = React.useRef<number[]>([]);
  const [activeNumber, setActiveNumber] = React.useState(-1);

  const arr = [...new Array(count)];
  const blocks = arr.map((_, i) => {
    const checkActive = activeNumbers.current.includes(i);
    const colorActive = checkActive ? props.colorActive : "";
    const rotate = (360 / count) * i;
    return (
      <Block
        key={i}
        {...props}
        transformActive={checkActive}
        colorActive={colorActive}
        rotate={rotate}
      />
    );
  });

  React.useEffect(() => {
    if (activeNumber < 0) return;
    activeNumbers.current.includes(activeNumber)
      ? activeNumbers.current.shift()
      : activeNumbers.current.push(activeNumber);
  }, [activeNumber]);

  React.useEffect(() => {
    const state = (curr: number) => (curr < count - 1 ? curr + 1 : 0);
    const interval = setInterval(() => setActiveNumber(state), delay ?? 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <StyledLoading className="loading5" {...props}>
      {blocks}
    </StyledLoading>
  );
};

export default Loading5;
