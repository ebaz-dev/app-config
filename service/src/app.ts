import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { healthRouter } from "./routes/health";
import { infoRouter } from "./routes/info";
import { errorHandler, NotFoundError } from "@ebazdev/core";
import cookieSession from "cookie-session";
import * as dotenv from "dotenv";
dotenv.config();

const apiPrefix = "/api/v1/app/cfg";

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: true,
    secure: process.env.NODE_ENV !== "test",
    keys: [process.env.JWT_KEY!],
  })
);

app.use(apiPrefix, healthRouter);
app.use(apiPrefix, infoRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
