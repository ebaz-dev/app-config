import { app } from "./app";
import dotenv from "dotenv";
dotenv.config();

const start = async () => {
  if (!process.env.PORT) {
    throw new Error("PORT must be defined");
  }

  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
};

start();
