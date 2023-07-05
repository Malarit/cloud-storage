import getValueFromObjArr from "./getValueFromObjArr";

function createObjFromArrValueToKey<T extends { [key: string]: string }[]>(
  arr: T,
  key: keyof T[number],
  setValue: any
) {
  const keys = getValueFromObjArr(arr, key);
  const obj = keys.reduce(
    (o, key) => ({ ...o, [key]: setValue }),
    {}
  ) as Record<(typeof keys)[number], typeof setValue>;
  return obj;
}

export default createObjFromArrValueToKey;
