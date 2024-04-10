// routes/unsubscribeRoutes.ts

import express, { Request, Response } from "express";
import Subscription from "../models/Subscription";

const router = express.Router();

// Handle unsubscribe requests
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    // Find and delete the subscription record based on the user's email
    const deletedSubscription = await Subscription.findOneAndDelete({ email });
    if (!deletedSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json({ message: "Unsubscription successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { router as unsubscribeRoutes };
