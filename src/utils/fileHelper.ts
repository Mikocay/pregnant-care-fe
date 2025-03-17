export const validateImage = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    return { success: false, message: 'You can only upload JPG/PNG files!' };
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    return { success: false, message: 'Image must be smaller than 2MB!' };
  }
  return { success: true, message: '' };
};
