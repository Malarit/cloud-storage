import React from "react";

export type Loading = {
  size: string;
  children?: React.ReactNode;
};

export type block = {
  rotate: number;
  sizeBlock: string;
  color?: string;
  colorActive?: string;
  active?: boolean;
  transformActive?: boolean;
  transition?: number;
} & Pick<Loading, "size">;

type props = { count: number; delay?: number };

export type loadingProps = Omit<block, "rotate" | "transformActive"> &
  Loading &
  props;
