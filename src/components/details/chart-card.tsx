"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { useStockTimeSeries } from "@/hooks/use-stock-time-series";
import LoadingCard from "../common/loading-card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import InfoCard from "../common/info-card";
import { Button } from "../ui/button";
import {
  ChartPeriod,
  FormattedStockTimeSerie,
  StockTimeSeries,
} from "@/types/types";
import { cn } from "@/lib/utils";
import { useStockGlobalQuote } from "@/hooks/use-stock-global-quote";
import { Heart } from "lucide-react";
import { ChartCustomTooltip } from "./chart-custom-tooltip";
import { useStocksStore } from "@/stores/stocks-store";

const chartPeriods: Record<ChartPeriod, number> = {
  "1D": 1,
  "5D": 5,
  "30D": 30,
  "100D": 100,
};

const parseStockData = (data: StockTimeSeries, period: ChartPeriod) => {
  const timeSeriesKey =
    period === "1D" ? "Time Series (5min)" : "Time Series (Daily)";
  const rawEntries = Object.entries(data?.[timeSeriesKey] || {});

  return rawEntries.map(([date, values]) => ({
    date,
    open: values["1. open"],
    high: values["2. high"],
    low: values["3. low"],
    close: values["4. close"],
    volume: values["5. volume"],
  }));
};

const ChartCard = () => {
  const { favourites, actions } = useStocksStore();
  const [selectedPeriod, setSelectedPeriod] = useState<ChartPeriod>("1D");
  const params = useParams();
  const symbol = Array.isArray(params?.symbol)
    ? params.symbol[0]
    : params?.symbol;

  const isFavourite = symbol ? favourites.includes(symbol) : false;

  const { data, isLoading } = useStockTimeSeries({
    query: symbol,
    period: selectedPeriod,
  });

  const { data: globalQuote, isLoading: globalQuoteLoading } =
    useStockGlobalQuote(symbol);

  useEffect(() => {
    if (symbol) {
      actions.updateRecentlyViewed(symbol);
    }
  }, []);

  if (isLoading || globalQuoteLoading) return <LoadingCard />;
  if (!data) return null;
  if (data.Information) return <InfoCard text={data.Information} />;

  const formattedData: FormattedStockTimeSerie[] = parseStockData(
    data,
    selectedPeriod
  );

  const filteredData: FormattedStockTimeSerie[] =
    selectedPeriod === "1D"
      ? formattedData
      : formattedData.slice(0, chartPeriods[selectedPeriod]);

  const change = parseFloat(
    globalQuote?.["Global Quote"]?.["09. change"] ?? "0"
  );

  const color =
    change > 0 ? "oklch(0.765 0.177 163.223)" : "oklch(0.712 0.194 13.428)";

  const handleFavourite = () => {
    if (symbol) {
      actions.toggleFavourites(symbol);
    }
  };

  return (
    <Card className="h-[400px] md:col-span-4 flex flex-col">
      <CardHeader className="flex gap-1 flex-row p-2 items-center space-y-0 justify-between">
        <div className="flex gap-1">
          {Object.keys(chartPeriods).map((key) => {
            return (
              <Button
                key={key}
                onClick={() => setSelectedPeriod(key as ChartPeriod)}
                variant={selectedPeriod === key ? "default" : "secondary"}
                className={cn("text-xs p-1 h-auto")}
              >
                {key}
              </Button>
            );
          })}
        </div>
        <Button size={"icon"} variant={"ghost"} onClick={handleFavourite}>
          {isFavourite ? <Heart fill={"#1e293b"} /> : <Heart />}
        </Button>
      </CardHeader>

      <CardFooter className="flex-1 p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData}>
            <XAxis
              dataKey={"date"}
              reversed
              tickFormatter={(v) =>
                selectedPeriod === "1D" ? v.split(" ")[1] : v
              }
            />
            <YAxis
              orientation={"right"}
              type="number"
              domain={[
                (dataMin: number) => dataMin * 0.95,
                (dataMax: number) => dataMax * 1.05,
              ]}
              allowDecimals={false}
              tickCount={3}
              scale={"linear"}
            />
            <Area
              dataKey="close"
              stroke={color}
              fill={color}
              fillOpacity={0.3}
            />
            <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" />
            <Tooltip content={(v) => <ChartCustomTooltip {...v} />} />
          </AreaChart>
        </ResponsiveContainer>
      </CardFooter>
    </Card>
  );
};

export default ChartCard;
