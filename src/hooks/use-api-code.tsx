"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { setApiCode as setGlobalApiCode } from "@/stores/api-code-store";

type ApiCodeContextType = {
  apiCode: string;
  setApiCode: (value: string) => void;
  resetApiCode: () => void;
};

const ApiCodeContext = createContext<ApiCodeContextType | undefined>(undefined);

export const ApiCodeProvider = (p: { children: ReactNode }) => {
  const [apiCode, setApiCodeState] = useState("demo");

  const setApiCode = (value: string) => {
    setApiCodeState(value);
    setGlobalApiCode(value);
  };

  const resetApiCode = () => setApiCode("demo");

  return (
    <ApiCodeContext.Provider value={{ apiCode, setApiCode, resetApiCode }}>
      {p.children}
    </ApiCodeContext.Provider>
  );
};

export const useApiCode = (): ApiCodeContextType => {
  const context = useContext(ApiCodeContext);
  if (!context) {
    throw new Error("useApiCode must be used within a ApiCodeProvider");
  }
  return context;
};
