function getValueFromObjArr<T extends { [key: string]: any }[]>(
  arr: T,
  key: keyof T[number]
) {
  const newArr: T[number][typeof key][] = [];

  for (let i = 0; i < arr.length; i++) {
    newArr.push(arr[i][key as string]);
  }

  return newArr;
}

export default getValueFromObjArr;
