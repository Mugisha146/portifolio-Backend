import mongoose, { Schema, Document } from "mongoose";

interface CommentDocument extends Document {
  text: string;
}
const commentSchema: Schema = new Schema({
  text: { type: String, required: true },
});
const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);

export { Comment, CommentDocument };
