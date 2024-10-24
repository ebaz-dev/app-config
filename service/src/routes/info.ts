import { validateRequest } from "@ebazdev/core";
import express, { Request, Response } from "express";
import { query } from "express-validator";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

interface AppVersionInfo {
  baseUrl: string;
  stage: string;
}

const appInfo: AppInfo = {
  "1.0.0": {
    baseUrl: "https://pro.ebazaar.mn",
    stage: "prod",
  },
  "1.0.1": {
    baseUrl: "https://pro.ebazaar.mn",
    stage: "prod",
  },
  "1.0.2": {
    baseUrl: "https://pro.ebazaar.mn",
    stage: "prod",
  },
  "1.0.3": {
    baseUrl: "https://k8sapi-dev.ebazaar.mn",
    stage: "dev",
  },
};

interface AppInfo {
  [version: string]: AppVersionInfo;
}
router.get(
  "/info",
  [
    query("version")
      .isString()
      .notEmpty()
      .withMessage("Must be valid app version"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { version } = req.query;

    if (version && typeof version === "string" && appInfo[version]) {
      return res
        .status(StatusCodes.OK)
        .json({ ...appInfo[version], update: false });
    } else {
      const prodVersion = Object.values(appInfo).find(
        (info) => info.stage === "prod"
      );

      return res.status(StatusCodes.OK).json({
        ...prodVersion,
        update: true,
      });
    }
  }
);

export { router as infoRouter };
