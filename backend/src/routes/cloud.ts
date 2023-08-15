import { Router } from "express";
import { upload } from "../middleware/upload.js";
import * as controller from "../controllers/cloud/cloud.controller.js";

const router = Router();

router.post("/cloud", upload.array("files"), controller.set_file);

router.get("/cloud", controller.get_files);
router.get("/folder", controller.get_folder);
router.get("/updateName", controller.update_name);

export default router;
