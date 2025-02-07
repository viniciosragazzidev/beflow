"use client";

import { AppContextProvider } from "@/lib/context/app.context";
import { ToastProvider } from "@/lib/context/toast.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
const queryClient = new QueryClient();

const ProvidersApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <ToastProvider>{children}</ToastProvider>
        </AppContextProvider>
      </QueryClientProvider>
    </div>
  );
};

export default ProvidersApp;
