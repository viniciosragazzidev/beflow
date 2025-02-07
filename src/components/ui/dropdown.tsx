"use client";

import { DropdownContextType, useAppContext } from "@/lib/context/app.context";
import { useEffect, useRef } from "react";

interface DropdownProps {
  children?: React.ReactNode;
}

const Dropdown = ({ children }: DropdownProps) => {
  return <div className="relative inline-block">{children}</div>;
};

interface DropdownContainerProps {
  children: React.ReactNode;
  info: DropdownContextType;
  side?: "left" | "right" | "top" | "bottom";
  close?: boolean;
}

const DropdownContainer = ({
  children,
  info,
  side = "left",
  close = false,
}: DropdownContainerProps) => {
  const { dropdown, toogleDropdown } = useAppContext();
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Verifica se o clique foi dentro do dropdown ou no trigger
      if (
        dropRef.current &&
        !dropRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest("[data-dropdown-trigger]")
      ) {
        setTimeout(() => {
          toogleDropdown({ name: "", id: "" }); // Fecha o dropdown
        }, 100);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (dropdown?.name === info.name && close) {
      toogleDropdown({ name: "", id: "" });
    }
  }, [close]);
  return (
    <div
      ref={dropRef}
      className={`w-44 min-h-10   flex flex-col slide-to-top-and-opacity  absolute border border-app-border-light dark:border-app-border/30 ${
        side === "right" ? "right-10" : "left-10"
      }  top-12 bg-app-card-bg-light dark:bg-app-card-bg ${
        dropdown?.name === info.name ? "block" : "hidden opacity-0 invisible"
      }`}
    >
      {children}
    </div>
  );
};

// 🎯 Botão para abrir o Dropdown
interface DropdownTriggerProps {
  children: React.ReactNode;
  info: DropdownContextType;
  onClick?: () => void;
}

const DropdownTrigger = ({ children, info, onClick }: DropdownTriggerProps) => {
  const { toogleDropdown, dropdown } = useAppContext();
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    if (dropdown?.name === info.name) {
      toogleDropdown({ name: "", id: "" }); // Fecha o dropdown
    } else {
      toogleDropdown(info); // Abre o dropdown
    }

    onClick?.();
  };

  return (
    <button ref={btnRef} onClick={handleToggle} data-dropdown-trigger>
      {children}
    </button>
  );
};

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const DropdownItem = ({ children, onClick }: DropdownItemProps) => {
  const { toogleDropdown } = useAppContext();

  const handleItem = () => {
    // Fecha o dropdown
    setTimeout(() => {
      toogleDropdown({ name: "", id: "" });
    }, 100);

    onClick?.();
  };
  return (
    <div
      onClick={handleItem}
      className="px-2 py-2 w-full flex items-center gap-1  border-b border-app-border-light dark:border-app-border/20   hover:rounded-sm hover:bg-app-border-light dark:hover:bg-app-border/15 cursor-pointer"
    >
      {children}
    </div>
  );
};

interface DropdownSubProps {
  label: string;
  children: React.ReactNode;
}

const DropdownSub = ({ label, children }: DropdownSubProps) => {
  const { dropdown, toogleDropdown } = useAppContext();
  const subRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    toogleDropdown({ name: `submenu-${label}` });
  };

  return (
    <div ref={subRef} className="relative">
      <div
        onClick={handleToggle}
        className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between"
      >
        {label}
        <span>▶</span>
      </div>
      <div
        className={`absolute left-full top-0 mt-0 ml-2 bg-white border rounded-md shadow-lg transition-opacity duration-200 ${
          dropdown?.name === `submenu-${label}`
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

// Exportando tudo junto
export {
  Dropdown,
  DropdownContainer,
  DropdownItem,
  DropdownSub,
  DropdownTrigger,
};
