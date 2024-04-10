import mongoose, { Document, Schema } from "mongoose";

interface ContactDocument extends Document {
  name: string;
  email: string;
  message: string;
  replied?: string; // ID of the admin who replied
  // Other fields like timestamps, etc.
}

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  replied: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to admin user
  // Other schema options like timestamps, etc.
});

const Contact = mongoose.model<ContactDocument>("Contact", contactSchema);

export { Contact, ContactDocument };
