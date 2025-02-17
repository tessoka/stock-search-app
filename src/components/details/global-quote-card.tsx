"use client";

import React from "react";
import { Card, CardDescription, CardHeader } from "../ui/card";
import { useParams } from "next/navigation";
import { useStockGlobalQuote } from "@/hooks/use-stock-global-quote";
import { ArrowBigDownDash, ArrowBigUpDash, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import LoadingCard from "../common/loading-card";
import InfoCard from "../common/info-card";

const GlobalQuoteCard = () => {
  const params = useParams();

  const symbol = Array.isArray(params?.symbol)
    ? params.symbol[0]
    : params?.symbol;

  const { data, isLoading } = useStockGlobalQuote(symbol);

  if (isLoading) return <LoadingCard />;
  if (!data) return null; // Empty state
  if (data.Information) return <InfoCard text={data.Information} />;
  if (!data["Global Quote"]) return null; // Empty state

  const change = parseFloat(data["Global Quote"]["09. change"]);

  return (
    <Card className="h-full overflow-clip flex flex-col">
      <CardHeader
        className={cn(
          change > 0 && "bg-emerald-300",
          change < 0 && "bg-rose-300",
          "flex flex-col items-center gap-2"
        )}
      >
        <p className="text-3xl flex items-center gap-1 font-bold">
          <DollarSign size={32} />
          <span>
            {parseFloat(data?.["Global Quote"]["05. price"]).toFixed(2)}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <span>
            {change > 0 && <ArrowBigUpDash />}
            {change < 0 && <ArrowBigDownDash />}
          </span>
          <span>
            {change > 0 && "+"}
            {parseFloat(data?.["Global Quote"]["09. change"]).toFixed(2)}
          </span>
          <span>
            {change > 0 && "+"}
            {parseFloat(data?.["Global Quote"]["10. change percent"]).toFixed(
              2
            )}
            %
          </span>
        </p>
        <p>{data?.["Global Quote"]["07. latest trading day"]}</p>
      </CardHeader>
      <CardDescription className="bg-slate-100 flex-1 grid place-content-center min-h-40">
        <p className="text-3xl">{data["Global Quote"]["01. symbol"]}</p>
      </CardDescription>
    </Card>
  );
};

export default GlobalQuoteCard;
