import ChartCard from "@/components/details/chart-card";
import GlobalQuoteCard from "@/components/details/global-quote-card";
import { Card } from "@/components/ui/card";
import React from "react";

const StockDetailsPage = () => {
  return (
    <main className="max-w-screen-xl mx-auto py-20 px-5">
      <div className="grid md:grid-rows-2 grid-cols-1 md:grid-cols-5 gap-4">
        <div className="h-[400px]">
          <GlobalQuoteCard />
        </div>
        <div className="h-[400px] md:col-span-4">
          <ChartCard />
        </div>
        <div className="h-[300px] md:col-span-2 ">
          <Card className="h-full grid place-content-center">Placeholder</Card>
        </div>
        <div className="h-[300px]">
          <Card className="h-full grid place-content-center">Placeholder</Card>
        </div>
        <div className="h-[300px] md:col-span-2">
          <Card className="h-full grid place-content-center">Placeholder</Card>
        </div>
      </div>
    </main>
  );
};

export default StockDetailsPage;
