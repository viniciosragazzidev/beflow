"use client";

import { createContext, useContext, useState } from "react";

export type DropdownContextType = {
  id?: string;
  name: string;
};
type AppContextType = {
  dropdown: DropdownContextType;
  setDropdown: (value: DropdownContextType) => void;
  closeDropdown: () => void;
  openDropdown: (value: DropdownContextType) => void;
  toogleDropdown: (value: DropdownContextType) => void;
};

const AppContext = createContext<AppContextType>({
  dropdown: {
    id: "",
    name: "",
  },
  setDropdown: () => {},
  closeDropdown: () => {},
  openDropdown: () => {},
  toogleDropdown: () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  //Dropdown Area

  const [dropdown, setDropdown] = useState<DropdownContextType>({
    id: "",
    name: "",
  });

  const closeDropdown = () => {
    setDropdown({
      id: "",
      name: "",
    });
  };

  const openDropdown = (value: DropdownContextType) => {
    setDropdown(value);
  };

  const toogleDropdown = (value: DropdownContextType) => {
    if (dropdown.name === value.name) {
      closeDropdown();
    } else {
      openDropdown(value);
    }
  };

  /* ************************************************** */

  return (
    <AppContext.Provider
      value={{
        toogleDropdown,
        openDropdown,
        closeDropdown,
        dropdown,
        setDropdown,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext deve ser usado dentro de um AppProvider");
  }
  return context;
};
