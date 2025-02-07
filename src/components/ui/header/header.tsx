"use server";
import { getUser } from "@/lib/services/users.services";
import { cookies } from "next/headers";
import HeaderBar from "./header.bar";

const Header = async () => {
  const token = (await cookies()).get("token")?.value || null;
  const user = token ? await getUser() : null;

  return (
    <div className="flex items-center">
      <HeaderBar isAutheticated={token} user={user} />
    </div>
  );
};

export default Header;
