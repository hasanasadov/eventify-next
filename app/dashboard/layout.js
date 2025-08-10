"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/DashboardSidebar";
import QueryProvider from "@/providers/QueryProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
  const router = useRouter();

  // useEffect(() => {
  //   const accessToken = localStorage.getItem("access_token");
  //   if (!accessToken) {
  //     router.push("/");
  //   }
  // }, []);

  return (
    <html>
      <body>
        <SidebarProvider className="bg-black border">
          <DashboardSidebar />
          <main className="w-full md:px-6 relative pt-4">
            <SidebarTrigger className="absolute left-3 top-3" />
            <div className="md:p-6 p-4 rounded-[10px] text-white  w-full">
              <QueryProvider>{children}</QueryProvider>
            </div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
