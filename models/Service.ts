import { Schema, Document, models, model } from "mongoose";

export interface IService extends Document {
  title: string;
  desc: string;
  kicker?: string;
  deliverables?: string;
  ribbon?: string;
  tags?: string[];
  img1?: string;
  img2?: string;
  features?: string[];
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    title:        { type: String, required: true },
    desc:         { type: String, required: true },
    kicker:       { type: String, default: "SERVICE" },
    deliverables: { type: String, default: "" },
    ribbon:       { type: String, default: "" },
    tags:         { type: [String], default: [] },
    img1:         { type: String, default: "" },
    img2:         { type: String, default: "" },
    features:     { type: [String], default: [] },
    order:        { type: Number, default: 0 },
    published:    { type: Boolean, default: true },
  },
  { timestamps: true, strict: false }
);

// Bust Next.js dev server in-memory model cache if schema updated
if (models.Service && !models.Service.schema?.paths?.kicker) {
  delete (models as Record<string, unknown>).Service;
}

export default models.Service || model<IService>("Service", ServiceSchema);
