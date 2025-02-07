"use server";

import { revalidateTag } from "next/cache";
import { cache } from "react";
import { ProfileType, UserType } from "../types/type";
import { getUser } from "./users.services";

export const createProfile = async (profile: Omit<ProfileType, "id">) => {
  try {
    const user: { user: UserType } = await getUser();
    const dataProfile = { ...profile, userId: user.user.id };

    const response = await fetch("http://localhost:3001/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataProfile),
    });

    if (response.ok) {
      console.log("Perfil criado com sucesso");
      return response.json();
    } else {
      console.log("Erro ao criar perfil");
      throw new Error("Erro ao criar perfil");
    }
  } catch (error) {
    console.error("Erro ao criar perfil:", error);
    throw error;
  }
};

export const getProfileByUserId = cache(async (userId: string) => {
  try {
    const response = await fetch(`http://localhost:3001/profiles/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile data");
    }

    const profile = await response.json();

    return profile;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    throw error;
  }
});

export const getProfileByUsername = cache(async (username: string) => {
  try {
    const response = await fetch(`http://localhost:3001/profile/${username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: ["profile-data", username],
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile data");
    }

    const profile = await response.json();

    return profile;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    throw error;
  }
});

export const revalidateTagCustom = async (tag: string) => {
  revalidateTag(tag);
};
