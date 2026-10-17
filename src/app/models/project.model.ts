export interface Project {
  _id: string;
  title: string;
  description?: string;
  techStack: string[];
  isFeatured?: boolean;
  link?: string;
  github?: string;
  status: 'active' | 'completed' | 'on-hold';
  createdAt: string | Date;
}
