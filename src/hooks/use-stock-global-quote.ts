import { stockGlobalQuotes } from "@/data/dummy";
import { ApiFunctionEnum } from "@/types/enums";
import { StockGlobalQuote } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export const useStockGlobalQuote = (query?: string) => {
  return useQuery<StockGlobalQuote, Error>({
    enabled: !!query,
    queryKey: [
      `function=${ApiFunctionEnum.GLOBAL_QUOTE}`,
      `symbol=${query?.toUpperCase()}`,
    ],
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
    select: (data) => {
      if (data.hasOwnProperty("Information")) {
        return (
          stockGlobalQuotes.find(
            (quote) =>
              query &&
              quote["Global Quote"]["01. symbol"].toLowerCase() ===
                query.toLowerCase()
          ) || data
        );
      } else {
        return data;
      }
    },
  });
};
