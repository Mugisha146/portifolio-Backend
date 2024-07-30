import mongoose, { Document, Schema } from "mongoose";

export interface SkillDocument extends Document {
  name: string;
  percentage: number;
}

const skillSchema: Schema<SkillDocument> = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});

const Skill = mongoose.model<SkillDocument>("Skill", skillSchema);

export default Skill;
