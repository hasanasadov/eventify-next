"use client";

import { Toaster } from "sonner";
import QueryProvider from "./QueryProvider";
import ThemeProviderWrapper from "./ThemeProvider";
import { ScrollToTop } from "@/utils/ScrollToTop";

export default function CustomLayout({ children }) {
  return (
    <ThemeProviderWrapper>
      <main className="flex-grow ">
        <QueryProvider>{children}</QueryProvider>
      </main>
      <Toaster />
      <ScrollToTop />
    </ThemeProviderWrapper>
  );
}
