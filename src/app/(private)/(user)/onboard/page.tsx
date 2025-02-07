"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { interestsList } from "@/lib/constants/app";
import { useToast } from "@/lib/context/toast.context";
import { createProfile } from "@/lib/services/profile.services";
import { Interest, ProfileType } from "@/lib/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  surname: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  dateOfBirth: z.string().nonempty("Data de nascimento obrigatória"),
  gender: z.enum(["male", "female", "other"]),
  interests: z
    .array(z.object({ id: z.number(), name: z.string() }))
    .max(3, "Escolha no máximo 3 interesses"),
});

type FormData = z.infer<typeof formSchema>;

const Onboarding = () => {
  const route = useRouter();
  const { addToast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      dateOfBirth: "",
      gender: "male",
      interests: [],
    },
  });

  const selectedInterests = watch("interests");

  const handleInterestClick = (interest: Interest) => {
    setValue(
      "interests",
      selectedInterests.some((i) => i.id === interest.id)
        ? selectedInterests.filter((i) => i.id !== interest.id)
        : selectedInterests.length < 3
        ? [...selectedInterests, interest]
        : selectedInterests
    );
  };

  const mutation = useMutation({
    mutationFn: createProfile, // Função que será chamada na mutação
    onSuccess: () => {
      // Redirecionar ou mostrar mensagem de sucesso
      addToast({
        message: "Perfil criado com sucesso!",
        type: "success",
        redirectTo: "/app",
      });
    },
    onError: (error) => {
      // Exibir mensagem de erro
      alert("Erro ao registrar o usuário. Tente novamente." + error);
    },
  });

  useEffect(() => {
    addToast({
      message: "Antes de continuar, complete as informações do seu perfil",
      type: "success",
      timeout: 3000,
    });
  }, []);

  useEffect(() => {
    if (errors.name || errors.surname || errors.email || errors.dateOfBirth) {
      addToast({
        message: "Preencha os campos obrigatórios",
        type: "error",
        timeout: 3000,
      });
    }
  }, [errors]);

  const onSubmit = async (data: FormData) => {
    const profile: Omit<ProfileType, "id"> = {
      bio: "",
      dateOfBirth: new Date(data.dateOfBirth),
      email: data.email,
      image: "https://i.pravatar.cc/300",
      interestsTags: selectedInterests.map((interest) => interest.name),
      name: data.name,
      surname: data.surname,
      username: data.name.toLowerCase() + data.surname.toLowerCase(),
      userId: "",
    };

    mutation.mutate(profile);
  };

  return (
    <div className="flex flex-col w-full relative">
      <div
        className="cursor-pointer m-4"
        onClick={() => route.push("/feed")}
        title="Voltar"
      >
        <Button variant="outline" size="sm">
          Voltar
        </Button>
      </div>
      <section className="onboard w-screen flex justify-center">
        <div className="container w-full flex flex-col justify-center items-center">
          <header className="py-2 pb-4">
            <h1 className="text-xl font-bold text-center">
              Complete as informações do seu perfil
            </h1>
            <p className="text-xs text-app-subtitle-light text-center dark:text-app-subtitle">
              Preencha os campos abaixo para personalizar sua experiência no
              BeFlow
            </p>
          </header>
          <form
            className="flex flex-col gap-4 w-full max-w-[400px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex gap-2">
              <div className="flex flex-col w-full">
                <Input
                  type="text"
                  placeholder="Nome"
                  {...register("name")}
                  className="input"
                  variant={`${errors.name ? "error" : "primary"}`}
                />
              </div>
              <div className="flex flex-col w-full">
                <Input
                  type="text"
                  placeholder="Sobrenome"
                  {...register("surname")}
                  className="input"
                  variant={`${errors.surname ? "error" : "primary"}`}
                />
              </div>
            </div>
            <Input
              type="email"
              placeholder="E-mail"
              {...register("email")}
              className="input"
              variant={`${errors.email ? "error" : "primary"}`}
            />

            <div className="flex w-full gap-2">
              <div className="flex flex-col w-full">
                <Input
                  type="date"
                  {...register("dateOfBirth")}
                  className="input"
                  variant={`${errors.dateOfBirth ? "error" : "primary"}`}
                />
              </div>
              <div className="scheme-dark w-full h-full">
                <select
                  {...register("gender")}
                  className="input scheme-dark w-full h-full border border-app-border-light bg-app-card-bg dark:border-app-border/50 rounded-md pl-1"
                >
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
                  <option value="other">Outro</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {interestsList.map((interest) => (
                <Button
                  key={interest.id}
                  type="button"
                  className={`px-3 py-1 border rounded`}
                  onClick={() => handleInterestClick(interest)}
                  variant={
                    selectedInterests.some((i) => i.id === interest.id)
                      ? "primary"
                      : "outline"
                  }
                >
                  {interest.name}
                </Button>
              ))}
            </div>

            <Button type="submit" variant="primary" size="md">
              {mutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" />
                  <span>Continuar</span>
                </>
              )}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Onboarding;
