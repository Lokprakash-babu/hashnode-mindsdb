import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserContextProvider from "./Providers/UserContextProvider";
import { ClerkProvider } from "@clerk/nextjs";
import Applayout from "./Components/Applayout.tsx";
import clsx from "clsx";
import RouteWhitelister from "./Components/RouteWhitelister";
import NextUiProviderWrapper from "./Providers/NextUiProviderWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skillsnap",
  description: "Where passion meets demand",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={clsx(
            inter.className,
            "h-screen overflow-hidden text-[#27313b]"
          )}
        >
          <UserContextProvider>
            <NextUiProviderWrapper>
              <RouteWhitelister>
                <Applayout>{children}</Applayout>
              </RouteWhitelister>
            </NextUiProviderWrapper>
          </UserContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
