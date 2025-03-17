import { axiosPrivate, axiosUpload } from "@/config/axios";
import { AxiosResponse } from "axios";

interface UploadFilePayload {
    file: File;
}

interface UploadMultipleFilesPayload {
    files: string[];
}

interface UploadFileResponse {
    url: string;
    key: string;
}

const uploadImage = (file: File): Promise<AxiosResponse<UploadFileResponse>> => {
    // Create a FormData instance for multipart/form-data upload
    const formData = new FormData();
    formData.append('file', file);
    
    // Send as multipart/form-data - axios will set the correct Content-Type header
    return axiosUpload.post(`upload/single`, formData);};

export const s3Service = {
    uploadImage
};
