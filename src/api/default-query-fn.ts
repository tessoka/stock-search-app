import { QueryFunctionContext } from "@tanstack/react-query";

export const defaultQueryFn = async ({ queryKey }: QueryFunctionContext) => {
  const response = await fetch(
    `https://www.alphavantage.co/query?${queryKey.join("&")}&apikey=${
      process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY
    }`
  );
  return response.json();
};
