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
  coverImage: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}
