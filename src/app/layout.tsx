"use client";

import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defaultQueryFn } from "@/api/default-query-fn";
import { ApiCodeProvider } from "@/hooks/use-api-code";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { queryFn: defaultQueryFn } },
  });

  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <ApiCodeProvider>
          <QueryClientProvider client={queryClient}>
            <Header />
            {children}
          </QueryClientProvider>
        </ApiCodeProvider>
      </body>
    </html>
  );
}
