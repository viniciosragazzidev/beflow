"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { cache } from "react";
import { user_created_type } from "../types/type";

export const createUser = async (data: user_created_type) => {
  try {
    const response = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Usuário registrado com sucesso");
    } else {
      console.log("Erro ao registrar usuário");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};

export const signInUser = async (data: Omit<user_created_type, "name">) => {
  try {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dt = await response.json();

    if (response.ok) {
      const token = dt.token;
      if (token) {
        (await cookies()).set("token", token, {
          httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
          secure: process.env.NODE_ENV === "production", // Use secure in production
          sameSite: "strict", // Protects against CSRF
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
        await revalidateUser();
        return {
          message: "Login realizado com sucesso",
          token,
        };
      }
    } else {
      console.log("Erro ao fazer login:", dt.message);

      // Garante que a mensagem seja sempre uma string válida
      throw new Error(dt?.message || "Erro ao fazer login. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);

    // Garante que o erro lançado tenha uma mensagem válida
    throw new Error(
      error instanceof Error
        ? error.message
        : "Erro desconhecido ao fazer login."
    );
  }
};

export const isLoggedIn = async () => {
  const token = (await cookies()).get("token")?.value;
  return !!token;
};

// Use the new `cache` function from React/Next.js
export const getUser = cache(async () => {
  // Get server-side cookies
  const token = (await cookies()).get("token")?.value;

  // Fetch with enhanced caching options
  const response = await fetch("http://localhost:3001/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // Next.js 15 caching configuration
    next: {
      // Configurable revalidation
      revalidate: 3600, // Cache for 1 hour

      // Granular cache tags for precise invalidation
      tags: ["user-data"],
    },
  });

  // Check for response status
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json();
});

export const revalidateUser = async () => {
  revalidateTag("user-data");
};
