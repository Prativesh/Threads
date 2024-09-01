import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Topbar from "@/components/shared/Topbar";
import Leftbar from "@/components/shared/Leftbar";
import Bottombar from "@/components/shared/Bottombar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "A MERN App",
  icons: {
    icon: "/assets/logo.svg"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang='en'>
        <body className={inter.className}>
          <Topbar />

          <main className='flex flex-row'>
            <Leftbar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>{children}</div>
            </section>
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
