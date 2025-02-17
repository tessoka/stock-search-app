"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defaultQueryFn } from "@/api/default-query-fn";
import { ApiCodeProvider } from "@/hooks/use-api-code";

const queryClient = new QueryClient({
  defaultOptions: { queries: { queryFn: defaultQueryFn } },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApiCodeProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ApiCodeProvider>
  );
}
