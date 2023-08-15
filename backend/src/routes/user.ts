import { Router } from "express";
import * as controller from "../controllers/user/user.controller.js";

const router = Router();

router.post("/authorization", controller.authorization);
router.post("/registration", controller.registration);

router.get("/itsMe", controller.itsMe);

export default router;
