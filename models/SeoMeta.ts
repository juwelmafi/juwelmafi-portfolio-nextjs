import { Schema, Document, models, model } from "mongoose";

export interface ISeoMeta extends Document {
  pageKey: string;        // e.g. "home", "about", "projects", "blog", "services", "contact"
  pageLabel: string;      // Human-readable: "Home Page", "Blog Page"
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;        // URL for social sharing image
  twitterTitle: string;
  twitterDescription: string;
  canonicalUrl: string;
  updatedAt: Date;
}

const SeoMetaSchema = new Schema<ISeoMeta>(
  {
    pageKey:            { type: String, required: true, unique: true },
    pageLabel:          { type: String, required: true },
    metaTitle:          { type: String, default: "" },
    metaDescription:    { type: String, default: "" },
    ogTitle:            { type: String, default: "" },
    ogDescription:      { type: String, default: "" },
    ogImage:            { type: String, default: "" },
    twitterTitle:       { type: String, default: "" },
    twitterDescription: { type: String, default: "" },
    canonicalUrl:       { type: String, default: "" },
  },
  { timestamps: true }
);

export default models.SeoMeta || model<ISeoMeta>("SeoMeta", SeoMetaSchema);
