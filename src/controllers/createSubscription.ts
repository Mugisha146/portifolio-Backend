import { Request, Response } from "express";
import Subscription from "../models/Subscription";

export const createSubscription = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const subscription = new Subscription({ email });
    await subscription.save();
    res.status(201).json({ message: "Subscription successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteSubscribe = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const deletedSubscription = await Subscription.findOneAndDelete({ email });
    
    if (!deletedSubscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json({ message: "Unsubscription successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
