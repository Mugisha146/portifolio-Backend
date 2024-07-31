import mongoose, { Document, Schema } from "mongoose";

interface ContactDocument extends Document {
  name: string;
  email: string;
  message: string;
  replied?: string; 
}

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  replied: { type: Schema.Types.ObjectId, ref: "User" }, 
});

const Contact = mongoose.model<ContactDocument>("Contact", contactSchema);

export { Contact, ContactDocument };
