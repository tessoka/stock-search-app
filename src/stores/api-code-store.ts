let apiCode = "demo"; // Default API key

export const setApiCode = (newApiCode: string) => {
  apiCode = newApiCode;
};

export const getApiCode = () => apiCode;
