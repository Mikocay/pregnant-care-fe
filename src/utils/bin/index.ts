// Add this utility function to convert file to binary string
export const getFileBinaryString = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsBinaryString(file); // This reads the file as binary string directly
    });
};
  