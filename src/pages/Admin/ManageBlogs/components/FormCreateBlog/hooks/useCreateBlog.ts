import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { axiosPrivate } from "@/config/axios";
import { AxiosError, AxiosResponse } from 'axios';

// Define types for the payload and response
interface ICreateBlogPayload {
    heading: string;
    content: {};
    description: string;
    feature_image_url: string;
    week: number;
    published_date: number;
}

interface ICreateBlogResponse {
    id: string;
    // Include other fields returned by your API
    message?: string;
}

// Create the async function that performs the actual API call
const createBlogApi = async (payload: ICreateBlogPayload): Promise<AxiosResponse<ICreateBlogResponse>> => {
    return axiosPrivate.post('/blog-post', payload);
};

/**
 * React hook to create a blog post
 * @returns Mutation object with mutate function and state
 */
export const useCreateBlog = (
    options?: UseMutationOptions<
        AxiosResponse<ICreateBlogResponse>,
        AxiosError,
        ICreateBlogPayload
    >
) => {
    return useMutation<
        AxiosResponse<ICreateBlogResponse>,
        AxiosError,
        ICreateBlogPayload
    >({
        mutationFn: (payload: ICreateBlogPayload) => createBlogApi(payload),
        ...options,
        onSuccess: (data: any, variables: any, context: any) => {
            // You can add default success behavior here
            options?.onSuccess?.(data, variables, context);
        },
        onError: (error: any, variables: any, context: any) => {
            // You can add default error handling here
            console.error('Error creating blog post:', error);
            options?.onError?.(error, variables, context);
        }
    });
};