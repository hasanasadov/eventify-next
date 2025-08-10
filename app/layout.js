import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata = {
  title: "My Events",
  description: "My Events App",
  verification: {
    google: "Kgwc7apwSgQ78KHX9S3HLqqZCET7TAQk-OGZJGVJ1mg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning data-qb-installed>
      <body className="mb-[40px] lg:mb-0 ">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={false}
        >
          <main className="flex-grow ">
            <QueryProvider>{children}</QueryProvider>
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
