// routes/subscriptionRoutes.ts
import express, { Request, Response } from "express";
import Subscription, { SubscriptionDocument } from "../models/Subscription";

const router = express.Router();

// Handle subscription requests
router.post("/", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    // Validate email address
    // Store the email address in the database
    const subscription = new Subscription({ email });
    await subscription.save();
    res.status(201).json({ message: "Subscription successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as subscriptionRoutes };
