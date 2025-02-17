"use client";

import React, { useState } from "react";
import { Card, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiCode } from "@/hooks/use-api-code";
import { Copy, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useQueryClient } from "@tanstack/react-query";

const ApiCodeCard = () => {
  const { apiCode, setApiCode, resetApiCode } = useApiCode();
  const [inputValue, setInputValue] = useState("");
  const [openTooltip, setOpenTooltip] = useState(false);
  const qc = useQueryClient();

  const handleApplyCode = () => {
    setApiCode(inputValue);
    setInputValue("");
    qc.invalidateQueries();
  };

  const handleResetCode = () => {
    resetApiCode();
    qc.invalidateQueries();
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
            <Button onClick={handleResetCode}>Reset</Button>
          </div>
        </div>
      </CardDescription>
      <Tooltip open={openTooltip} delayDuration={0}>
        <TooltipTrigger
          className="absolute top-2 right-2"
          onClick={() => setOpenTooltip((p) => !p)}
        >
          <Info className="text-slate-600" size={16} />
        </TooltipTrigger>
        <TooltipContent
          className="bg-slate-800 space-y-1"
          onPointerDownOutside={() => setOpenTooltip(false)}
        >
          <p className="flex gap-2">
            <span>You may try to use my key:</span>
            {process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY && (
              <>
                <span>{process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY}</span>
                <Copy
                  size={12}
                  className="cursor-pointer"
                  onClick={() =>
                    setInputValue(process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY!)
                  }
                />
              </>
            )}
          </p>
          <p>It may over the daily free API call limit... :\</p>
        </TooltipContent>
      </Tooltip>
    </Card>
  );
};

export default ApiCodeCard;
