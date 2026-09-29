import { Schema, Document, models, model } from "mongoose";

export interface ISiteContent extends Document {
  key: string;        // unique key like "hero.title", "about.bio", "social.github"
  label: string;      // Human-readable label shown in the admin UI
  value: string;      // The actual content value
  type: "text" | "textarea" | "url" | "image";
  group: string;      // Group for grouping: "Hero", "About", "Social Links", etc.
  updatedAt: Date;
}

const SiteContentSchema = new Schema<ISiteContent>(
  {
    key:   { type: String, required: true, unique: true },
    label: { type: String, required: true },
    value: { type: String, default: "" },
    type:  { type: String, enum: ["text", "textarea", "url", "image"], default: "text" },
    group: { type: String, default: "General" },
  },
  { timestamps: true }
);

export default models.SiteContent || model<ISiteContent>("SiteContent", SiteContentSchema);
