import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IProject extends Document {
  title: string;
  desc: string;
  tech: string[];
  img: string;
  screenshot: string;
  live: string;
  client: string;
  server?: string;
  details: string;
  challenge: string;
  goal: string;
  reverse: boolean;
  order: number;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title:      { type: String, required: true },
    desc:       { type: String, required: true },
    tech:       { type: [String], default: [] },
    img:        { type: String, default: "" },
    screenshot: { type: String, default: "" },
    live:       { type: String, default: "" },
    client:     { type: String, default: "" },
    server:     { type: String, default: "" },
    details:    { type: String, default: "" },
    challenge:  { type: String, default: "" },
    goal:       { type: String, default: "" },
    reverse:    { type: Boolean, default: false },
    order:      { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Project || model<IProject>("Project", ProjectSchema);
