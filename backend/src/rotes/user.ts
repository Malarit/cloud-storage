import { Router } from "express";
import * as controller from "../controllers/user/user.controller.js";

const router = Router();

router.get("/itsMe", controller.itsMe);
router.post("/authorization", controller.authorization);
router.post("/registration", controller.registration);

export default router;
