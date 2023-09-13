import { Router } from "express";
import { upload } from "../middleware/upload.js";
import * as controller from "../controllers/cloud/cloud.controller.js";

const router = Router();

router.post("/cloud", upload.array("files"), controller.set_file);
router.post("/updateFolderCloud", controller.update_folder_cloud);
router.post("/updateName", controller.update_name);
router.post("/trash", controller.delete_file);
router.post("/recoverFile", controller.recover_file);

router.get("/cloud", controller.get_files);
router.get("/folder", controller.get_folder);
router.get("/download", controller.download);

export default router;
