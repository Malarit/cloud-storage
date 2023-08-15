import multer from "multer";
import { Request } from "express";
import { config } from "../config/config.js";
//
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.saveFileDestination);
  },
  filename: (req, file, cb) => {
    const originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    const fileName = Date.now() + "#-#" + originalname;
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
