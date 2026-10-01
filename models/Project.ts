import { Schema, Document, models, model } from "mongoose";

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
  category: string;
  reverse: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
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
    category:   { type: String, default: "MERN" },
    reverse:    { type: Boolean, default: false },
    order:      { type: Number, default: 0 },
  },
  { timestamps: true, strict: false }
);

// In Next.js dev server with hot reload, delete cached model if it lacks category path
if (models.Project && !models.Project.schema?.paths?.category) {
  delete (models as Record<string, unknown>).Project;
}

const ProjectModel = models.Project || model<IProject>("Project", ProjectSchema);

if (ProjectModel.schema && !ProjectModel.schema.paths.category) {
  ProjectModel.schema.add({ category: { type: String, default: "MERN" } });
}

export default ProjectModel;
