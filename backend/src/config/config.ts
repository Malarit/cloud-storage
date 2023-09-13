import * as dotenv from "dotenv";
dotenv.config();

import Cors from "../utils/cors.js";
import { isDialect } from "./service.js";
import { CookieOptions } from "express";

// Headers
const headers = {
  "Access-Control-Allow-Origin": "http://localhost:5173",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  "Access-Control-Allow-Headers": "X-Requested-With,content-type",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Expose-Headers": "X-Total-Count",
};

export const cors = new Cors(headers).setHeader();

// default values .env
const env = process.env;
export const config = {
  server: {
    PORT: env.PORT || 3001,
    HOST: env.HOST || "localhost",
  },
  db: {
    DATABASE: env.DB_DATABASE || "postgres",
    USERNAME: env.DB_USERNAME || "postgres",
    PASSWORD: env.DB_PASSWORD || "",
    DIALECT: isDialect(env.DIALECT || "postgres"),
    HOST: env.DB_HOST || "localhost",
    PORT: Number(env.DB_PORT) || 5432,
  },
  jwt: {
    ACCESS_TOKEN_SECRET: env.JWT_ACCESS_TOKEN_SECRET || "",
    ACCESS_TOKEN_NAME: env.JWT_ACCESS_TOKEN_NAME || "access_token",
    ACCESS_TOKEN_AGE: Number(env.JWT_ACCESS_TOKEN_AGE) || 3600,
  },
  saveFileDestination: "media/",
};

// jwt
export const cookie: CookieOptions = {
  // maxAge: 3600000,
  sameSite: "none",
  secure: true,
  domain: "localhost",
};
