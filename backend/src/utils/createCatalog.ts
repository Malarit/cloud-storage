import * as fs from "fs";

const createCatalog = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

export default createCatalog;
