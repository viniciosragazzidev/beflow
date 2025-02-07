// app/api/logout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // Remover o cookie
  const cookieStore = cookies();
  (await cookieStore).set("token", "", { path: "/", expires: new Date(0) });

  // Retornar uma resposta indicando sucesso
  return NextResponse.json({ message: "Logout realizado com sucesso" });
}
