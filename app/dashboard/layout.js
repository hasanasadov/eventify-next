import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./_components/DashboardSidebar";
import "../globals.css";
import QueryProvider from "@/providers/QueryProvider";

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <SidebarProvider className="bg-black border">
          <DashboardSidebar />
          <main className="w-full px-6 relative pt-4">
            <SidebarTrigger className="absolute left-3 top-3" />
            <div className="p-6 rounded-[10px] text-white  w-full">
             <QueryProvider>{children}</QueryProvider>
            </div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
