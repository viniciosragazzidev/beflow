"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useState } from "react";
import Button from "../ui/button";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("light");
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        setTheme(currentTheme === "light" ? "dark" : "light");
        setCurrentTheme(currentTheme === "light" ? "dark" : "light");
      }}
      className="w-9 px-0 overflow-hidden cursor-pointer"
    >
      <div className=" flex overflow-hidden">
        <Sun className="h-[1.2rem] w-[1.2rem]   block dark:hidden " />
        <Moon className=" h-[1.2rem] w-[1.2rem] hidden transition-all dark:block" />
      </div>
    </Button>
  );
}
