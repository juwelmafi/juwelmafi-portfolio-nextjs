import { Schema, Document, models, model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  category: string;
  coverImage: string;
  coverImageAlt: string;
  published: boolean;
  // SEO fields
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title:           { type: String, required: true },
    slug:            { type: String, required: true, unique: true },
    excerpt:         { type: String, default: "" },
    content:         { type: String, default: "" },
    tags:            { type: [String], default: [] },
    category:        { type: String, default: "" },
    coverImage:      { type: String, default: "" },
    coverImageAlt:   { type: String, default: "" },
    published:       { type: Boolean, default: false },
    // SEO fields for Google Search optimization
    metaTitle:       { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords:    { type: [String], default: [] },
    ogTitle:         { type: String, default: "" },
    ogDescription:   { type: String, default: "" },
    ogImage:         { type: String, default: "" },
    canonicalUrl:    { type: String, default: "" },
  },
  { timestamps: true }
);

// Index for fast lookups
BlogSchema.index({ published: 1, createdAt: -1 });

export default models.Blog || model<IBlog>("Blog", BlogSchema);

