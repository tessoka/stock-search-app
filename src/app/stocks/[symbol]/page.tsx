import ChartCard from "@/components/details/chart-card";
import FavsAndViewedCard from "@/components/details/favs-n-viewed-card";
import GlobalQuoteCard from "@/components/details/global-quote-card";
import { Card } from "@/components/ui/card";
import React from "react";

const StockDetailsPage = () => {
  return (
    <main className="max-w-screen-xl mx-auto py-20 px-5">
      <div className="grid md:grid-rows-2 grid-cols-1 md:grid-cols-5 gap-5 md:gap-4">
        <div className="md:h-[400px]">
          <GlobalQuoteCard />
        </div>
        <div className="h-[400px] md:col-span-4">
          <ChartCard />
        </div>
        <div className="md:h-[300px] md:col-span-2 ">
          <FavsAndViewedCard />
        </div>
        <Card className="h-[300px] md:col-span-3 grid place-content-center bg-slate-100 text-xs text-slate-600">
          Placeholder...
        </Card>
      </div>
    </main>
  );
};

export default StockDetailsPage;
