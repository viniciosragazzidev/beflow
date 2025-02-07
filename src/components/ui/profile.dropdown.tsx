"use client";

import { getProfileByUserId } from "@/lib/services/profile.services";
import { ProfileType } from "@/lib/types/type";
import { useMutation } from "@tanstack/react-query";
import { HelpCircle, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import LoginOut from "../system/logout";
import {
  Dropdown,
  DropdownContainer,
  DropdownItem,
  DropdownTrigger,
} from "./dropdown";

const ProfileDropdown = ({ userId }: { userId: string }) => {
  const [profile, setProfile] = useState<ProfileType>();
  const mutation = useMutation({
    mutationFn: getProfileByUserId,
    onSuccess: (data) => {
      setProfile(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleOpen = async () => {
    mutation.mutate(userId);
  };

  return (
    <div>
      <Dropdown>
        <DropdownTrigger
          onClick={handleOpen}
          info={{ name: "dropdown-profile", id: "1" }}
        >
          <div className="w-10 h-10 rounded-full border cursor-pointer border-app-border-light relative dark:border-app-border/30 bg-app-card-bg-light dark:bg-app-card-bg"></div>
        </DropdownTrigger>

        <DropdownContainer
          info={{ name: "dropdown-profile", id: "1" }}
          side="right"
        >
          <Link href={`/profile/${profile?.username}`}>
            <DropdownItem>
              <User className="w-4 h-4" /> Perfil
            </DropdownItem>
          </Link>

          <DropdownItem>
            <HelpCircle className="w-4 h-4" /> Ajuda
          </DropdownItem>

          <DropdownItem>
            <Settings className="w-4 h-4" /> Configurações
          </DropdownItem>

          <DropdownItem>
            <LoginOut>
              <span className="flex items-center gap-1">
                <LogOut className="w-4 h-4" /> Sair{" "}
              </span>
            </LoginOut>
          </DropdownItem>
        </DropdownContainer>
      </Dropdown>
    </div>
  );
};

export default ProfileDropdown;
