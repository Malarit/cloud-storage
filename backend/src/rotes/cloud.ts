import { Router } from "express";
import { upload } from "../middleware/upload.js";
import * as controller from "../controllers/cloud/cloud.controller.js";

const router = Router();

router.post("/cloud", upload.array("files"), controller.set_file);

export default router;
