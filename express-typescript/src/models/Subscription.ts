// models/Subscription.ts
import mongoose, { Document, Schema } from "mongoose";

export interface SubscriptionDocument extends Document {
  email: string;
}

const subscriptionSchema: Schema<SubscriptionDocument> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const Subscription = mongoose.model<SubscriptionDocument>(
  "Subscription",
  subscriptionSchema
);

export default Subscription;
