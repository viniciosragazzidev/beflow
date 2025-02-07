"use client";
import Button from "@/components/ui/button";
import { Flower, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();
  return (
    <main className="pt-12 flex justify-center w-full">
      <div className=" w-full justify-center flex flex-col  h-[calc(100vh-10rem)] items-center">
        {/* <Image
          src={HydraImage}
          alt=""
          width={130}
          height={130}
          className="hidden dark:block mb-4"
        />
        <Image
          src={HydraImageDark}
          alt=""
          className="dark:hidden mb-4"
          width={130}
          height={130}
        /> */}
        <Flower className="w-32 h-32  mr-1" />
        <section className="w-full max-w-[650px] flex flex-col gap-2 px-10 container justify-center items-center text-center">
          <h2 className="text-sm  text-app-subtext-light dark:text-app-subtext ">
            Bem vindo ao PortFlow{" "}
          </h2>
          <h1
            className="text-3xl font-bold 
        "
          >
            O melhor lugar para exibir e descobrir projetos incríveis
          </h1>
          <p className="text-base text-app-subtitle-light dark:text-app-subtitle">
            Publique seus trabalhos com um design envolvente, compartilhe
            ideias, receba feedback e construa sua comunidade de
            desenvolvedores.
          </p>

          <div className="flex py-4 gap-2">
            <Button
              size="md"
              variant="primary"
              // className="px-4 text-nowrap py-1.5 rounded-md "
              onClick={() => route.push("/feed")}
            >
              <Rocket className="w-4 h-4" /> <span>Iniciar Jornada </span>
            </Button>
            <button className=" px-4 py-1 rounded-full text-sm  cursor-pointer font-semibold">
              Explore os Projetos
            </button>
          </div>
        </section>

        {/* <section className="w-full flex flex-col gap-2 py-10">
          <div className="w-full py-5 border-y  border-accent-2-dark/50">
            <ul className="w-full flex items-center gap-2 px-10">
              <li>
                <span className="px-4 py-1 rounded-full bg-app-text-destack-bg-light dark:bg-app-text-destack-bg text-app-text-destack-light dark:text-app-text-destack cursor-pointer font-semibold">
                  Todos
                </span>
              </li>
              <li>
                <span className="px-4 py-1 rounded-full  text-gray-900">
                  Financeiro
                </span>
              </li>
            </ul>
          </div>

          <div className="w-full  grid grid-cols-1 place-content-center justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 py-8  ">
            <div className="card w-full max-w-[320px]  min-h-64 border border-gray-400/50 overflow-hidden rounded-2xl cursor-pointer hover:scale-[.99]  transition-all">
              <div className="image overflow-hidden relative w-full h-full max-h-[60%] bg-gray-400/50">
                <Image src={kyper} alt="" fill />
              </div>
              <div className="text px-2 py-4 flex flex-col gap-1">
                <h1 className="text-base font-semibold flex items-center gap-1">
                  <CircleDot className="w-3" />
                  Kyper Finance Sass
                </h1>
                <p className="text-xs line-clamp-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                  quidem distinctio quisquam.
                </p>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </main>
  );
}
