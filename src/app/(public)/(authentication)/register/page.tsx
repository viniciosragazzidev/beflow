"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useToast } from "@/lib/context/toast.context";
import { createUser } from "@/lib/services/users.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Flower, IdCard, Loader2, Lock, LogIn, User } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Definindo o esquema de validação com Zod
const registerSchema = z.object({
  firstName: z.string().min(1, "O nome é obrigatório"),
  lastName: z.string().min(1, "O sobrenome é obrigatório"),
  email: z.string().email("O e-mail não é válido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

// Tipo gerado pelo Zod
export type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const { addToast } = useToast();

  // Definindo a mutação com useMutation
  const mutation = useMutation({
    mutationFn: createUser, // Função que será chamada na mutação
    onSuccess: () => {
      // Redirecionar ou mostrar mensagem de sucesso
      addToast({
        message: "Perfil criado com sucesso!",
        type: "success",
        redirectTo: "/onboard",
      });
    },
    onError: (error) => {
      // Exibir mensagem de erro
      addToast({
        message: "Erro ao registrar o usuário. Tente novamente.",
        type: "error",
        timeout: 3000,
      });
      console.log(error);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    const user = {
      name: data.firstName + " " + data.lastName,
      email: data.email,
      password: data.password,
    };

    // Chamando a mutação para criar o usuário
    mutation.mutate(user);
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center">
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

          <h1 className="text-2xl font-bold text-center">Junte-se ao Flow</h1>
          <p className="text-xs text-app-subtitle-light text-center dark:text-app-subtitle">
            Informe abaixo seus dados de acesso para criar uma conta.
          </p>
        </div>
        <form
          className="flex flex-col gap-3 justify-center items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-2xs gap-1">
            <div className="flex flex-col w-full">
              <Input
                {...register("firstName")}
                type="text"
                placeholder="Nome"
                variant={errors.firstName?.message ? "error" : "primary"}
                customSize="md"
                className="w-full"
                icon={
                  <IdCard className="w-4 h-4 text-app-subtext-light dark:text-app-subtext" />
                }
              />
              {errors.firstName && (
                <span className="text-red-500 text-[10px] hidden text-nowrap text-start">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full">
              <Input
                {...register("lastName")}
                type="text"
                placeholder="Sobrenome"
                variant={errors.lastName?.message ? "error" : "primary"}
                customSize="md"
                className="w-full"
                icon={
                  <IdCard className="w-4 h-4 text-app-subtext-light dark:text-app-subtext" />
                }
              />
              {errors.lastName && (
                <span className="text-red-500 text-[10px] hidden text-nowrap text-start">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>
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
            variant={"primary"}
            className="w-2xs flex items-center justify-center gap-2"
          >
            {mutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Criar Conta</span>
              </>
            )}
          </Button>
        </form>

        <div className="flex gap-1">
          <p className="text-xs text-app-subtitle-light dark:text-app-subtitle">
            Já tem uma conta?{" "}
          </p>
          <Link
            className="text-xs text-app-subtitle-light dark:text-app-subtitle underline"
            href="/sign-in"
          >
            Entre agora
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center gap-5">
          <span className="text-sm text-app-subtitle-light dark:text-app-subtitle">
            ou
          </span>

          <Button
            size="md"
            variant="outline"
            className="w-2xs flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" /> <span>Entrar com Google</span>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Register;
