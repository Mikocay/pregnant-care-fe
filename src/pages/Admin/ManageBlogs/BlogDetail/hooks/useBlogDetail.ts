import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getBlogDetailQuery } from '../../query/blogDetailQuery';

export const useBlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['blogDetail', id],
    queryFn: getBlogDetailQuery,
    enabled: !!id,
    retry: false,
  });

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return {
    blog: data?.data,
    isLoading,
    error,
    handleGoBack,
  };
};
