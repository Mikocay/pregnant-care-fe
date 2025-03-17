export interface Blog {
  author_id: string;
  heading: string;
  content?: any; // Adding content field
  description: string;
  feature_image_url: string;
  published_date: number;
  status: string;
  week: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}
