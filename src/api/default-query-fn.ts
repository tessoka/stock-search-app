import { getApiCode } from "@/stores/api-code-store";
import { QueryFunctionContext } from "@tanstack/react-query";

export const defaultQueryFn = async ({ queryKey }: QueryFunctionContext) => {
  const apiKey = getApiCode();

  const response = await fetch(
    `https://www.alphavantage.co/query?${queryKey.join("&")}&apikey=${apiKey}`
  );

  return response.json();
};
