"use client";

import {
  Dropdown,
  DropdownContainer,
  DropdownItem,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { User } from "lucide-react";
import { useState } from "react";

const App = () => {
  const [closeDropdownExternal, setCloseDropdownExternal] = useState(false);
  return (
    <div>
      <Dropdown>
        <DropdownTrigger info={{ name: "dropdown-1", id: "1" }}>
          <div className="w-10 h-10 rounded-full border cursor-pointer border-app-border-light relative dark:border-app-border/30 bg-app-card-bg-light dark:bg-app-card-bg"></div>{" "}
        </DropdownTrigger>
        <DropdownContainer
          close={closeDropdownExternal}
          info={{ name: "dropdown-1", id: "1" }}
        >
          <DropdownItem
            onClick={() => setCloseDropdownExternal(!closeDropdownExternal)}
          >
            <User className="w-4 h-4" /> Perfil
          </DropdownItem>

          {/* <DropdownSub label="Submenu 1">
            <DropdownItem>Subitem 1</DropdownItem>
          </DropdownSub> */}
        </DropdownContainer>
      </Dropdown>

      {/* <button onClick={() => setCloseDropdownExternal(!closeDropdownExternal)}>
        Fechar Dropdown
      </button> */}
    </div>
  );
};

export default App;
