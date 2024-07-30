// comment.ts

import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Comment document
interface CommentDocument extends Document {
  text: string;
}

// Define the schema for the Comment model
const commentSchema: Schema = new Schema({
  text: { type: String, required: true },
});

// Create the Comment model
const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);

export { Comment, CommentDocument };
