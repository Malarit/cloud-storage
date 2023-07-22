export type ArgumentTypes<F extends Function | undefined> = F extends (
  ...args: infer A
) => any
  ? A
  : never;
