import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogDetailQuery } from '../../query/blogDetailQuery';

export const useBlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['blog', id],
    queryFn: getBlogDetailQuery,
    enabled: !!id,
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  return {
    blog: data?.data,
    isLoading,
    error,
    handleGoBack,
  };
};
