export const useProfile = () => {
  const onFinish = (values: any) => {
    console.log('Form values:', values);
    // Here you would typically send the data to your backend
  };

  const handleBack = () => {
    navigate(-1);
  };

    return {
        onFinish,
        handleBack,
    };
};
