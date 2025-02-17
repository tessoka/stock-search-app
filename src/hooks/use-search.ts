import { stockSearchResults } from "@/data/dummy";
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
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
    select: (data) => {
      if (data.hasOwnProperty("Information") && !!query) {
        return {
          ...data,
          bestMatches: stockSearchResults.bestMatches.filter(
            (result) =>
              result["1. symbol"].toLowerCase().includes(query.toLowerCase()) ||
              result["2. name"].toLowerCase().includes(query.toLowerCase())
          ),
        };
      } else {
        return data;
      }
    },
  });
};
