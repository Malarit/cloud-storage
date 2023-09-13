import asyncHandler from "express-async-handler";
import verifyToken from "../../utils/verifyToken.js";
import * as reqTypes from "./type.js";
import { User } from "../../models/models.js";
import { getHash, verifieHash } from "../../utils/hashedPassword.js";
import { jwtSign } from "../../utils/jwt.js";
import { config, cookie } from "../../config/config.js";
import getPlain from "../../utils/getPlain.js";

export const itsMe = asyncHandler(async (req, res) => {
  const userId = await verifyToken(req, res);
  if (userId) res.status(200).json({ userId });
});

export const authorization = asyncHandler(
  async (req: reqTypes.authorization, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: {
          email: email,
        },
      }).then(getPlain);

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
  }
);

export const registration = asyncHandler(
  async (req: reqTypes.registration, res) => {
    const { userName, password, email } = req.body;

    const hashPassword = await getHash(password);

    await User.build({
      userName,
      email,
      password: hashPassword,
    }).save();

    const user = await User.findOne({
      where: {
        userName: userName,
      },
    }).then(getPlain);

    const token = jwtSign(user?.id);

    res
      .cookie(config.jwt.ACCESS_TOKEN_NAME, token, cookie)
      .status(200)
      .json({ id: user?.id });
  }
);

export const userData = asyncHandler(async (req, res) => {
  const userId = await verifyToken(req, res);
  if (!userId) return;

  const userData = await User.findOne({
    attributes: ["userName", "email"],
    where: { id: userId },
  }).then(getPlain);

  res.status(200).json(userData);
});

export const updateUserData = asyncHandler(
  async (req: reqTypes.updateUserData, res) => {
    const userId = await verifyToken(req, res);
    if (!userId) return;
    const { userName, email } = req.body;

    await User.update(
      { userName, email },
      {
        where: { id: userId },
      }
    );

    res.status(200).json();
  }
);

export const exitLogin = asyncHandler(async (req, res) => {
  const userId = await verifyToken(req, res);
  if (!userId) return;

  res.clearCookie(config.jwt.ACCESS_TOKEN_NAME);
  res.end();
});
