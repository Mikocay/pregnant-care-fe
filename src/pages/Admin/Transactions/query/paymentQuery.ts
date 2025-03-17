import { PaginationResponse } from '@/types';
import { Payment } from '../types';
import { axiosPrivate } from '@/config/axios';

export const getPaymentQuery = async ({
  queryKey,
}: {
  queryKey: [string, number, number];
}) => {
  const [, page, limit] = queryKey;
  const response = await axiosPrivate.get<PaginationResponse<Payment>>(
    'payments',
    {
      params: {
        page,
        limit,
      },
    },
  );
  return response.data;
};
