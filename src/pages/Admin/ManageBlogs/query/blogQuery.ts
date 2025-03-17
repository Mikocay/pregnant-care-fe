import { PaginationResponse } from '@/types';
import { Blog } from '../types';
import { axiosPrivate } from '@/config/axios';

export const getBlogPostsQuery = async ({
  queryKey,
}: {
  queryKey: [string, number, number];
}) => {
  const [, page, limit] = queryKey;
  const response = await axiosPrivate.get<PaginationResponse<Blog>>(
    'blog-post',
    {
      params: {
        page,
        limit,
      },
    },
  );

  return response.data;
};
