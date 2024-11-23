import Navbar from "@/components/shared/Navbar";
import "./globals.css";
import SideBarLeft from "@/components/shared/SideBarLeft";
import SideBarRight from "@/components/shared/SideBarRight";

export const metadata = {
  title: "Eventify",
  description: "Eventify app for all your event needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="flex justify-between bg-gray-200  p-8 w-full">
          <SideBarLeft/>
          <main className="flex-grow">{children}</main>

          <SideBarRight />
        </div>
      </body>
    </html>
  );
}
