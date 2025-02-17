"use client";

import React, { useState } from "react";
import { Card, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiCode } from "@/hooks/use-api-code";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const ApiCodeCard = () => {
  const { apiCode, setApiCode, resetApiCode } = useApiCode();
  const [inputValue, setInputValue] = useState("");

  const handleApplyCode = () => {
    setApiCode(inputValue);
    setInputValue("");
  };

  return (
    <Card className="bg-slate-100 relative">
      <CardDescription className="p-4 flex flex-col gap-10">
        <div className="space-y-2">
          <p className="text-lg tracking-wide font-bold">
            Alphavantage API Code to use:
          </p>
          <form className="flex gap-2">
            <Input
              className="bg-white"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              onClick={handleApplyCode}
              disabled={!inputValue}
              type={"submit"}
            >
              Apply
            </Button>
          </form>
        </div>
        <div>
          <p className="text-lg tracking-wide font-bold space-x-2">
            <span>Currently used API Code:</span>
            <span className="text-rose-500">{apiCode} </span>
          </p>
          <div className="flex gap-2">
            <Button onClick={resetApiCode}>Reset</Button>
          </div>
        </div>
      </CardDescription>
      <Tooltip>
        <TooltipTrigger className="absolute top-2 right-2">
          <Info className="text-slate-600" size={16} />
        </TooltipTrigger>
        <TooltipContent className="bg-slate-700 space-y-1">
          <p className="flex gap-1">
            <span>You may try to use my key:</span>
            <span>{process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY}</span>
          </p>
          <p>It may over the daily free API call limit... :\</p>
        </TooltipContent>
      </Tooltip>
    </Card>
  );
};

export default ApiCodeCard;
