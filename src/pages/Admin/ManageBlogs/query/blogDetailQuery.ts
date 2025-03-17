import { axiosPrivate } from '@/config/axios';
import { Blog } from '../types';

interface BlogDetailResponse {
  data: Blog;
}

export const getBlogDetailQuery = async ({
  queryKey,
}: {
  queryKey: (string | undefined)[];
}) => {
  const [, blogId] = queryKey;
  if (!blogId) throw new Error('Blog ID is required');

  const response = await axiosPrivate.get<BlogDetailResponse>(
    `/blog-post/${blogId}`,
  );
  return response.data;
};
