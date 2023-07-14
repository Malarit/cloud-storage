function checkValuesObjArr<T extends { [key: string]: any }[]>(
  arr: T,
  key: keyof T[number],
  value: any
) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key as string] !== value) return false;
  }
  return true;
}

export default checkValuesObjArr;
