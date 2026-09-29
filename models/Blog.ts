import { Schema, Document, models, model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  category: string;
  coverImage: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title:       { type: String, required: true },
    slug:        { type: String, required: true, unique: true },
    excerpt:     { type: String, default: "" },
    content:     { type: String, default: "" },
    tags:        { type: [String], default: [] },
    category:    { type: String, default: "" },
    coverImage:  { type: String, default: "" },
    published:   { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Index for fast lookups
BlogSchema.index({ published: 1, createdAt: -1 });

export default models.Blog || model<IBlog>("Blog", BlogSchema);
