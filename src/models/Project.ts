import mongoose, { Document, Schema } from "mongoose";

export interface ProjectDocument extends Document {
  name: string;
  description: string;
  image: string;
}

const projectSchema: Schema<ProjectDocument> = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model<ProjectDocument>("Project", projectSchema);

export default Project;
