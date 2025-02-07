"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type ToastType = {
  id: number;
  message: string;
  type?: "success" | "error" | "info" | "warning";
};
type AddToastType = {
  message: string;
  type?: ToastType["type"];
  timeout?: number;
  redirectTo?: string;
};
type ToastContextType = {
  toasts: ToastType[];
  addToast: ({ message, type, timeout, redirectTo }: AddToastType) => void;
  removeToast: (id: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = ({ message, type, timeout, redirectTo }: AddToastType) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Remove o toast automaticamente após 3 segundos
    setTimeout(() => {
      removeToast(id);
    }, timeout || 3000);

    if (redirectTo) {
      setTimeout(() => {
        window.location.href = redirectTo;
      }, 1000);
    }
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider");
  }
  return context;
};
