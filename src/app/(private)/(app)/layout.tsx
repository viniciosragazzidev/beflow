"use server";

import { getUser } from "@/lib/services/users.services";
import { UserType } from "@/lib/types/type";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: { user: UserType } = await getUser();

  if (!user.user.profile_completed) {
    redirect("/onboard");
  }
  return <>{user.user.profile_completed && children}</>;
}
