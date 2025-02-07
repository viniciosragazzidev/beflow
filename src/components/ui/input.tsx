import { cn } from "@/lib/utils";
import { Command } from "lucide-react";
import { tv } from "tailwind-variants";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  command?: boolean;
  icon?: React.ReactNode;
  customSize?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "blue" | "error";
}

const inputVariants = tv({
  base: `w-full min-h-8 py-1   rounded-[6px] flex items-center px-2 `,
  variants: {
    customSize: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
    variant: {
      primary:
        " bg-app-card-bg-light dark:bg-app-card-bg  focus:outline focus:outline-app-subtext-light/40 dark:focus:outline-app-subtext-dark/40",
      secondary: "bg-app-hover-bg-light dark:bg-app-hover-bg",
      blue: "bg-blue text-white",
      error:
        " bg-app-input-bg-light/50 dark:bg-app-input-bg/50  outline outline-error-light/40 dark:focus:outline-error/40  ",
      outline: "bg-transparent",
    },
  },
  defaultVariants: {
    customSize: "md",
    variant: "primary",
  },
});

const Input = ({
  customSize,
  variant,
  icon,
  command,
  className,
  ...props
}: InputProps) => {
  return (
    <div className={"relative "}>
      {icon && (
        <span className="absolute left-2 top-[50%] translate-y-[-50%]">
          {icon}
        </span>
      )}
      <input
        {...props}
        type={props.type || "text"}
        className={cn(
          inputVariants({
            customSize: customSize,
            variant: variant,
          }) +
            " " +
            `${icon && "pl-8"} ${className}`
        )}
        placeholder={props.placeholder || "Procurando algo?"}
      />

      {command && (
        <span className="px-2 flex items-center gap-1 text-xs  rounded-sm bg-accent-1-dark/50 border border-gray-400">
          <Command className="w-3" />
          <span>K</span>
        </span>
      )}
    </div>
  );
};

export default Input;
