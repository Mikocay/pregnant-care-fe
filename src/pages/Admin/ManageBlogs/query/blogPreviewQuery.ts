import { axiosPrivate } from '@/config/axios';
import { Blog } from '../types';

interface BlogPreviewResponse {
  data: Blog;
}

export const getBlogPreviewByWeekQuery = async ({
  queryKey,
}: {
  queryKey: (string | number)[];
}) => {
  const [, week] = queryKey;
  if (!week) throw new Error('Week is required');

  const response = await axiosPrivate.get<BlogPreviewResponse>(
    '/blog-post/preview',
    {
      params: { week },
    },
  );
  return response.data;
};
