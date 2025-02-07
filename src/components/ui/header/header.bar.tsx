"use client";
import { AUTH_ROUTES } from "@/lib/constants/routes";
import { UserType } from "@/lib/types/type";
import {
  Compass,
  Flower,
  GitBranch,
  HelpCircle,
  LayoutDashboard,
  Search,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../../system/dark-mode-button";
import Button from "../button";
import Input from "../input";
import ProfileDropdown from "../profile.dropdown";

const HeaderBar = ({
  isAutheticated,
  user,
}: {
  isAutheticated: string | null;
  user?: { user: UserType };
}) => {
  const pathname = usePathname();
  const verify_route = AUTH_ROUTES.includes(pathname as string);

  // // Função para chamar a API de logout
  const userId = user?.user.id;

  return (
    <>
      {!verify_route && (
        <header className="w-full flex justify-center items-center px-4 border-b border-app-border-light dark:border-app-border/50 ">
          <div className="container w-full py-3 flex justify-between items-center">
            <div className="left flex items-center gap-6">
              <Link href="/" className="logo flex items-center">
                <Flower className="w-6 h-6  mr-1" />
                <h1 className="text-base font-semibold">
                  Be<span className="font-bold">Flow</span>
                </h1>
              </Link>
              <nav className="max-sm:hidden">
                <ul className="flex items-center gap-3">
                  <Link href={"/feed"}>
                    <li className="text-app-subtext-light dark:text-app-subtext flex items-center gap-1 px-4 rounded-full py-2 hover:dark:bg-accent-1-dark hover:bg-accent-1-light   cursor-pointer ">
                      <Compass className="w-4" /> <span>Explorar</span>
                    </li>
                  </Link>
                  <Link href={"/app"}>
                    <li className="text-app-subtext-light dark:text-app-subtext flex items-center gap-1 px-4 rounded-full py-2 hover:dark:bg-accent-1-dark hover:bg-accent-1-light   cursor-pointer ">
                      <LayoutDashboard className="w-4" />
                      <span>Dashboard</span>
                    </li>
                  </Link>
                  <Link href={"/help"}>
                    <li className="text-app-subtext-light dark:text-app-subtext flex items-center gap-1 px-4 rounded-full py-2 hover:dark:bg-accent-1-dark hover:bg-accent-1-light   cursor-pointer ">
                      <HelpCircle className="w-4" />
                      <span>Ajuda</span>
                    </li>
                  </Link>
                </ul>
              </nav>
            </div>
            <div className="right flex items-center gap-4">
              <Input icon={<Search className="w-4 text-app-subtext" />} />

              <GitBranch className="w-6" />
              <ModeToggle />
              {!isAutheticated && !userId ? (
                <Link href="/sign-in">
                  <Button
                    type="button"
                    size="md"
                    variant="primary"
                    // className="px-4 text-nowrap py-1.5 rounded-md "
                  >
                    Entrar na conta{" "}
                  </Button>
                </Link>
              ) : (
                <ProfileDropdown userId={userId ? userId : ""} />
              )}
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default HeaderBar;
