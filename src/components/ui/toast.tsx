"use client";

import { useToast } from "@/lib/context/toast.context";
import { cn } from "@/lib/utils"; // Se não usar Tailwind, pode remover isso.
import { CheckCircle } from "lucide-react";

const toastStyles = {
  success:
    " text-black dark:text-white border border-app-border-light dark:border-app-border/50",
  error: " text-black dark:text-white border border-red-500/15",
  info: " text-black dark:text-white border border-blue-500/15",
  warning: " text-black dark:text-white border border-yellow-500/15",
};

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "px-4 bg-app-card-bg-light dark:bg-app-card-bg/40  rounded shadow-lg border slide-to-top  flex py-4 items-center text-[13px] transition-opacity duration-300",
            toastStyles[toast.type || "success"]
          )}
          onClick={() => removeToast(toast.id)}
        >
          {toast.type === "success" ? (
            <span className="text-blue">
              <CheckCircle className="mr-2 w-4" />
            </span>
          ) : toast.type === "error" ? (
            <span className="text-blue">
              <CheckCircle className="mr-2 w-4" />
            </span>
          ) : toast.type === "info" ? (
            <span className="text-blue">
              <CheckCircle className="mr-2 w-4" />
            </span>
          ) : toast.type === "warning" ? (
            <span className="text-blue">
              <CheckCircle className="mr-2 w-4" />
            </span>
          ) : null}
          {toast.message}
        </div>
      ))}
    </div>
  );
};
