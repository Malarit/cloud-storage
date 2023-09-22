import express from "express";
import { createServer } from "http";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.js";
import cloudRouter from "./routes/cloud.js";

import { runDB } from "./db/index.js";
import { cors, config } from "./config/config.js";
import createCatalog from "./utils/createCatalog.js";

const app = express();
const server = createServer(app);

createCatalog(config.saveFileDestination);

app.use(cors);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(config.saveFileDestination, express.static(config.saveFileDestination));

app.use("/api", userRouter);
app.use("/api", cloudRouter);

server.listen(config.server.PORT, () => {
  console.log("\x1b[34m%s\x1b[0m", `Listening on port! ${config.server.PORT}!`);
});

runDB();
