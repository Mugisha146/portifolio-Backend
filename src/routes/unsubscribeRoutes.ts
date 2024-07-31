import express, { Request, Response } from "express";
import { deleteSubscribe } from "../controllers/createSubscription";

const router = express.Router();

router.delete("/", deleteSubscribe);

export { router as unsubscribeRoutes };
