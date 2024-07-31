import express  from "express";
import { createSubscription } from "../controllers/createSubscription";

const router = express.Router();

router.post("/", createSubscription);

export { router as subscriptionRoutes };
