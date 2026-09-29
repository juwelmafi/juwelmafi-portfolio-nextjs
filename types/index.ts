export interface Project {
  id?: string;
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
  category?: string;
  reverse: boolean;
  order: number;
  createdAt?: string;
}

export interface Blog {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  category: string;
  coverImage: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Lesson {
  id?: string;
  title: string;
  youtubeUrl: string;
  youtubeId?: string;
  duration: string;
  summary: string;
  codeSnippet?: string;
  order: number;
}

export interface Course {
  id?: string;
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  category: string;
  level: string;
  badge?: string;
  lessons: Lesson[];
  published: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Service {
  id?: string;
  title: string;
  desc: string;
  tags: string[];
  img1?: string;
  img2?: string;
  features?: string[];
  order: number;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}
