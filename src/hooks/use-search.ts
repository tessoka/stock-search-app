import { ApiFunctionEnum } from "@/types/enums";
import { StockSearchResult } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const useSearch = (query?: string) => {
  return useQuery<StockSearchResult, Error>({
    enabled: !!query,
    queryKey: [
      `function=${ApiFunctionEnum.SYMBOL_SEARCH}`,
      `keywords=${query?.toUpperCase()}`,
    ],
    staleTime: 1000 * 60 * 5,
  });
};
