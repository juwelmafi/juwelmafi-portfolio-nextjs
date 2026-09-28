import { Schema, Document, models, model } from "mongoose";

export interface ILesson {
  id?: string;
  title: string;
  youtubeUrl: string;
  youtubeId?: string;
  duration: string;
  summary: string;
  codeSnippet?: string;
  order: number;
}

export interface ICourse extends Document {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: string;
  level: string;
  badge?: string;
  lessons: ILesson[];
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new Schema<ILesson>({
  title:       { type: String, required: true },
  youtubeUrl:  { type: String, required: true },
  youtubeId:   { type: String, default: "" },
  duration:    { type: String, default: "15:00" },
  summary:     { type: String, default: "" },
  codeSnippet: { type: String, default: "" },
  order:       { type: Number, default: 0 },
});

const CourseSchema = new Schema<ICourse>(
  {
    title:       { type: String, required: true },
    slug:        { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    thumbnail:   { type: String, default: "" },
    category:    { type: String, default: "MERN Stack" },
    level:       { type: String, default: "All Levels" },
    badge:       { type: String, default: "" },
    lessons:     { type: [LessonSchema], default: [] },
    published:   { type: Boolean, default: true },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true }
);

CourseSchema.index({ published: 1, order: 1 });

export default models.Course || model<ICourse>("Course", CourseSchema);
