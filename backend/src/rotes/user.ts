import { Router } from "express";
import verifyToken from "../utils/verifyToken.js";
import * as reqTypes from "./type.js";
import { User } from "../models/models.js";
import { getHash, verifieHash } from "../utils/hashedPassword.js";
import { jwtSign } from "../utils/jwt.js";
import { config, cookie } from "../config/config.js";

const router = Router();

router.get("/itsMe", async (req, res) => {
  const id = await verifyToken(req, res);
  if (id) res.status(200).json({ id });
});

router.post("/authorization", async (req: reqTypes.authorization, res) => {
  try {
    const { email, password } = req.body;

    const user = (
      await User.findOne({
        where: {
          email: email,
        },
      })
    )?.get({ plain: true });

    if (!user) {
      res.status(404).json("Couldn't find the user ");
      return;
    }

    const verifie = await verifieHash(password, user.password);
    if (verifie) {
      const token = jwtSign(user.id);
      res
        .cookie(config.jwt.ACCESS_TOKEN_NAME, token, cookie)
        .status(200)
        .json("cookie set");
      return;
    }

    res.status(400).json("Failed verifie password");
  } catch (error) {
    res.status(400).json({ Failed: error });
  }
});

router.post("/registration", async (req: reqTypes.registration, res) => {
  try {
    const { userName, password, email } = req.body;

    const hashPassword = await getHash(password);

    await User.build({
      userName,
      email,
      password: hashPassword,
    }).save();

    const user = (
      await User.findOne({
        where: {
          userName: userName,
        },
      })
    )?.get({ plain: true });

    const token = jwtSign(user?.id);

    res
      .cookie(config.jwt.ACCESS_TOKEN_NAME, token, cookie)
      .status(200)
      .json("cookie set");
  } catch (error) {
    res.status(400).json({ Failed: error });
  }
});
