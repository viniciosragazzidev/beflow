"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useToast } from "@/lib/context/toast.context";
import { signInUser } from "@/lib/services/users.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Flower, Loader2, Lock, LogIn, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Definindo o esquema de validação com Zod
const signInSchema = z.object({
  email: z.string().email("O e-mail não é válido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

// Tipo gerado pelo Zod
type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Definindo a mutação com useMutation

  const { addToast } = useToast();

  const mutation = useMutation({
    mutationFn: signInUser,
    onSuccess: (message) => {
      if (message?.token) {
        console.log(message.token);
        addToast({
          message: message.message,
          type: "success",
          redirectTo: "/feed",
        });
      }
    },
    onError: (error: Error) => {
      // Exibir mensagem de erro
      switch (error.message) {
        case "UnauthorizedUser not found":
          setErrorMessage("E-mail ou senha inválidos.");
          break;
        default:
          setErrorMessage("Erro ao fazer login. Tente novamente.");
          break;
      }
      console.log(error.message);
    },
  });

  const onSubmit = (data: SignInFormData) => {
    setErrorMessage(null);
    mutation.mutate({ email: data.email, password: data.password });
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      {errorMessage && (
        <p className="text-red-500 absolute top-5">{errorMessage}</p>
      )}
      <div className="w-full max-w-[450px] min-h-96 flex flex-col gap-5 justify-center items-center">
        <div className="flex flex-col gap-1">
          <div className="flex w-full justify-center">
            {/* <Image
              src={HydraImage}
              alt=""
              width={94}
              height={94}
              className="hidden dark:block"
            />
            <Image
              src={HydraImageDark}
              alt=""
              className="dark:hidden"
              width={94}
              height={94}
            /> */}
            <Flower className="w-20 h-20  mr-1" />
          </div>
          <h1 className="text-2xl font-bold text-center">Bem-vindo de volta</h1>
          <p className="text-xs text-app-subtitle-light text-center dark:text-app-subtitle">
            Informe seus dados de acesso para continuar.
          </p>
        </div>
        <form
          className="flex flex-col gap-3 justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col w-full">
            <Input
              {...register("email")}
              type="email"
              placeholder="E-mail"
              variant={errors.email?.message ? "error" : "primary"}
              customSize="md"
              className="w-2xs"
              icon={
                <User className="w-4 h-4 text-app-subtext-light dark:text-app-subtext" />
              }
            />
            {errors.email && (
              <span className="text-red-500 text-[10px] hidden text-nowrap text-start">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <Input
              {...register("password")}
              type="password"
              placeholder="Senha"
              variant={errors.password?.message ? "error" : "primary"}
              className="w-2xs"
              customSize="md"
              icon={
                <Lock className="w-4 h-4 text-app-subtext-light dark:text-app-subtext" />
              }
            />
            {errors.password && (
              <span className="text-red-500 text-[10px] hidden text-nowrap text-start">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button
            size="md"
            variant="primary"
            type="submit"
            className="w-2xs flex items-center justify-center gap-2"
          >
            {mutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Entrar</span>
              </>
            )}
          </Button>
        </form>
        <div className="flex gap-1">
          <p className="text-xs text-app-subtitle-light dark:text-app-subtitle">
            Não tem uma conta?{" "}
          </p>
          <Link
            className="text-xs text-app-subtitle-light dark:text-app-subtitle underline"
            href="/register"
          >
            Cadastre-se agora
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
