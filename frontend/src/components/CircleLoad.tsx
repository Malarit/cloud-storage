import styled, { keyframes } from "styled-components";

type load = {
  size: string;
};

type circle = {
  strokeWidth: string;
  color: string;
  colorShadow: string;
};

type circleLoad = {
  size: string;
} & circle;

const anima = keyframes`
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Load = styled.svg<load>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  animation: ${anima} 2s linear infinite;
`;

const Circle = styled.circle<circle>`
  width: 100%;
  height: 100%;
  stroke-width: ${({ strokeWidth }) => strokeWidth};
  stroke: ${({ color }) => color};
  stroke-linecap: round;
  filter: ${({ strokeWidth, colorShadow }) =>
    `drop-shadow(0 0 calc(${strokeWidth} / 2) ${colorShadow})`};
`;

const CircleLoad: React.FC<circleLoad> = (props) => {
  const { size, ...anyProps } = props;

  const r = `calc(${size} / 2.5)`;
  const dasharray = `calc(${Math.PI} * ${r} * 2)`;
  const pct = `calc(((100 - ${50}) / 100) * ${dasharray})`;

  return (
    <Load size={size}>
      <Circle
        {...anyProps}
        strokeDasharray={dasharray}
        strokeDashoffset={pct}
        cx={`50%`}
        cy={`50%`}
        r={r}
      ></Circle>
    </Load>
  );
};

export default CircleLoad;
