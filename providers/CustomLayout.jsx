"use client";

import ThemeProviderWrapper from "./ThemeProvider";
import QueryProvider from "./QueryProvider";
import { ScrollToTop } from "@/utils/ScrollToTop";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

export default function CustomLayout({ children }) {
  return (
    <SessionProvider>
      <ThemeProviderWrapper>
        <main className="flex-grow ">
          <QueryProvider>{children}</QueryProvider>
        </main>
        <Toaster />
        <ScrollToTop />
      </ThemeProviderWrapper>
    </SessionProvider>
  );
}
