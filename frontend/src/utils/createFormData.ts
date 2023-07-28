const createFormData = <T extends { [key: string]: string | Blob }>(obj: T) => {
  const formData = new FormData();
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    formData.append(key, obj[key]);
  }
  return formData;
};

export default createFormData;
