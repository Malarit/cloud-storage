import * as fs from "fs";
import { config } from "../config/config.js";

const deleteFile = (fileName: string) => {
  fs.unlinkSync(config.saveFileDestination + fileName);
};

export default deleteFile;
