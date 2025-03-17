import { axiosPrivate } from '@/config/axios';
import { useQuery } from '@tanstack/react-query';
import { getBlogPreviewByWeekQuery } from '@/pages/Admin/ManageBlogs/query/blogPreviewQuery';

export interface BlogPreview {
  id: string;
  heading: string;
  description: string;
  feature_image_url: string;
  published_date: number;
  week: number;
  status: string;
}

export interface BlogPreviewResponse {
  data: BlogPreview;
}

export const blogService = {
  getBlogPreviewByWeek: (week: number) => {
    return axiosPrivate.get<BlogPreviewResponse>('/blog-post/preview', {
      params: { week },
    });
  },
};

export const useBlogPreviewByWeekQuery = (week: number) => {
  return useQuery({
    queryKey: ['blogPreview', week],
    queryFn: getBlogPreviewByWeekQuery,
    enabled: !!week,
    retry: false,
  });
};
