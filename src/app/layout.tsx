import ProvidersApp from "@/components/system/providers";
import { ThemeProvider } from "@/components/system/theme-provider";
import Header from "@/components/ui/header/header";
import { ToastContainer } from "@/components/ui/toast";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeFlow",
  description: "Project by BeFlow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${inter.className} antialiased text-sm bg-primary-bg-light dark:bg-app-bg `}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main>
            <ProvidersApp>
              <Header />
              <ToastContainer />
              {children}
            </ProvidersApp>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
