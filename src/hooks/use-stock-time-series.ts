import { ApiFunctionEnum } from "@/types/enums";
import { ChartPeriod, StockTimeSeries } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

interface UseStockTimeSeriesProps {
  query?: string;
  period?: ChartPeriod;
}

export const useStockTimeSeries = ({
  query,
  period,
}: UseStockTimeSeriesProps) => {
  const periodQuery =
    period === "1D"
      ? ApiFunctionEnum.TIME_SERIES_INTRADAY
      : ApiFunctionEnum.TIME_SERIES_DAILY;

  const queryKey = [
    `function=${periodQuery}`,
    `symbol=${query?.toUpperCase()}`,
    period === "1D" ? "interval=5min" : null,
  ].filter(Boolean);

  return useQuery<StockTimeSeries, Error>({
    queryKey,
    enabled: Boolean(query),
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
  });
};
