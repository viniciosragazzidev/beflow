import { cn } from "@/lib/utils";
import React from "react";
import { tv } from "tailwind-variants";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "blue";
  children: React.ReactNode;
}

const button = tv({
  base: "text-nowrap flex items-center justify-center rounded-md cursor-pointer px-4 py-2 hover:opacity-90 gap-1 ",
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    variant: {
      primary: "bg-app-button-bg-light dark:bg-app-button-bg",
      secondary: "bg-app-hover-bg-light dark:bg-app-hover-bg",
      blue: "bg-blue text-white",
      outline:
        "bg-transparent border border-app-subtext-light/40 dark:border-app-subtext-dark/40",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
});

const Button = ({ ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        button({ variant: props.variant, size: props.size }) +
          " " +
          props.className
      )}
    >
      {props.children}
    </button>
  );
};

export default Button;
