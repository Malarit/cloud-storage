const getFileNameType = (fileName: string) => {
  const arr = fileName.split(".");
  return { name: arr[0], type: arr[1] };
};

export default getFileNameType;
