import React from "react";
import styled from "styled-components";

type progress = {
  size: string;
};

type circle = {
  strokeWidth: string;
  color: string;
  colorShadow: string;
};

type circleProgress = progress &
  circle & {
    value: number;
  };

const Progress = styled.svg<progress>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  transform: rotate(-90deg);
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

const CircleProgress: React.FC<circleProgress> = (props) => {
  const { size, value, ...anyProps } = props;

  const r = `calc(${size} / 2.5)`;
  const dasharray = `calc(${Math.PI} * ${r} * 2)`;
  const pct = `calc(((100 - ${value}) / 100) * ${dasharray})`;

  return (
    <Progress size={size}>
      <Circle
        {...anyProps}
        strokeDasharray={dasharray}
        strokeDashoffset={pct}
        cx={`50%`}
        cy={`50%`}
        r={r}
      ></Circle>
    </Progress>
  );
};

export default CircleProgress;
