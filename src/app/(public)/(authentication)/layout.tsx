"use client";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AuthenticationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const route = useRouter();
  return (
    <div>
      <div
        className="absolute top-4 left-4 cursor-pointer"
        onClick={() => route.back()}
        title="Voltar"
      >
        <Button variant="outline" size="sm">
          Voltar
        </Button>
      </div>
      {children}
    </div>
  );
}
