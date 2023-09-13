function getArrFromArrObjByKey<T extends { [key: string]: any }>(
  arr: T[],
  key: keyof T
) {
  return arr.reduce<number[]>((prev, curr) => {
    prev.push(curr[key]);
    return prev;
  }, []);
}
export default getArrFromArrObjByKey;
