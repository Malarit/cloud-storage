const regex = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  oneDigit: /\d+/,
  allUpperCase: /[A-Z]+/,
  eightСhar: /^.{8,}$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
};

export default regex;

export const customMatch = (
  str: string,
  regexp: RegExp | keyof typeof regex
): string => {
  const reg = typeof regexp == "string" ? regex[regexp] : regexp;
  const result = str.match(reg)?.[0];
  return result || "";
};
