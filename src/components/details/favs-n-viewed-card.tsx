"use client";

import React from "react";
import { Card, CardDescription } from "../ui/card";
import { useStocksStore } from "@/stores/stocks-store";
import { Button } from "../ui/button";
import Link from "next/link";

const FavsAndViewedCard = () => {
  const { favourites, recentlyViewed } = useStocksStore();
  return (
    <Card className="md:h-[300px] overflow-clip flex flex-col lg:flex-row bg-slate-100">
      <CardDescription className="flex-1 p-4 space-y-2">
        <p className="text-lg tracking-wide font-bold">Favourite Stocks:</p>
        <div className="flex gap-1 flex-wrap">
          {favourites.map((symbol) => {
            return (
              <Link key={symbol} href={`/stocks/${symbol}`}>
                <Button variant={"outline"} size={"sm"}>
                  {symbol.toUpperCase()}
                </Button>
              </Link>
            );
          })}
        </div>
      </CardDescription>
      <CardDescription className="flex-1 p-4  space-y-2">
        <p className="text-lg tracking-wide font-bold">Recently Viewed:</p>
        <div className="flex gap-1 flex-wrap">
          {recentlyViewed.map((symbol) => {
            return (
              <Link key={symbol} href={`/stocks/${symbol}`}>
                <Button variant={"outline"} size={"sm"}>
                  {symbol.toUpperCase()}
                </Button>
              </Link>
            );
          })}
        </div>
      </CardDescription>
    </Card>
  );
};

export default FavsAndViewedCard;
