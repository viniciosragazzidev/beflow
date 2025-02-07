"use client";

import { useToast } from "@/lib/context/toast.context";

const LoginOut = ({ children }: { children: React.ReactNode }) => {
  const { addToast } = useToast();

  const handleLogout = async () => {
    const res = await fetch("/api/logout", { method: "GET" });

    if (res.ok) {
      addToast({
        message: "Logout realizado com sucesso",
        type: "success",
        timeout: 3000,
        redirectTo: "/",
      });
    } else {
      console.error("Erro ao fazer logout");
    }
  };
  return (
    <div className="w-full" onClick={handleLogout}>
      {children}
    </div>
  );
};

export default LoginOut;
