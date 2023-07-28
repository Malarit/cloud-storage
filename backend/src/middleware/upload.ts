import multer from "multer";
import { Request } from "express";
import { config } from "../config/config.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.saveFileDestination);
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.fieldname + "." + file.mimetype;
    cb(null, fileName);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype == "image/*") {
  }
  cb(null, true);
};

export const upload = multer({ storage, fileFilter });
