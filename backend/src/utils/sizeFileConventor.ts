function sizeFileConventor() {
  const k = 1024;
  const dm = 2;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const convert = (bytes: number) => {
    if (bytes === 0) return "0 B";

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const convertToBytes = (value: string) => {
    const prefix = value.match(/[^\d\W]+/g);
    if (!prefix) return 0;

    const index = sizes.findIndex((value) => value === prefix[0]);
    if (index < 0) return 0;

    return Number.parseFloat(value) * Math.pow(k, index);
  };

  return { convert, convertToBytes };
}

export default sizeFileConventor;
