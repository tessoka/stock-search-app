"use client";

import React, { useState } from "react";
import { Card, CardDescription } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiCode } from "@/hooks/use-api-code";

const ApiCodeCard = () => {
  const { apiCode, setApiCode, resetApiCode } = useApiCode();
  const [inputValue, setInputValue] = useState("");

  const handleApplyCode = () => {
    setApiCode(inputValue);
    setInputValue("");
  };

  return (
    <Card className="bg-slate-100">
      <CardDescription className="p-4 flex flex-col gap-10">
        <div className="space-y-2">
          <p className="text-lg tracking-wide font-bold">
            Alphavantage API Code to use:
          </p>
          <div className="flex gap-2">
            <Input
              className="bg-white"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button onClick={handleApplyCode} disabled={!inputValue}>
              Apply
            </Button>
          </div>
        </div>
        <div>
          <p className="text-lg tracking-wide font-bold space-x-2">
            <span>Currently used API Code:</span>
            <span className="text-rose-600">{apiCode} </span>
          </p>
          <div className="flex gap-2">
            <Button onClick={resetApiCode}>Reset</Button>
          </div>
        </div>
      </CardDescription>
    </Card>
  );
};

export default ApiCodeCard;
