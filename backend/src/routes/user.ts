import { Router } from "express";
import * as controller from "../controllers/user/user.controller.js";

const router = Router();

router.post("/authorization", controller.authorization);
router.post("/registration", controller.registration);
router.post("/updateUserData", controller.updateUserData);

router.get("/itsMe", controller.itsMe);
router.get("/userData", controller.userData);
router.get("/exitLogin", controller.exitLogin);

export default router;
