import Link from "next/link";
import "../globals.css";
import { ArrowBack } from "@mui/icons-material";
import { Toaster } from "sonner";

export const metadata = {
  title: "Eventify",
  description: "Eventify app for all your event needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="absolute top-6 left-8 font-bold flex items-center hover:cursor-pointer hover:scale-105 hover:translate-x-[-15px] transition-transform duration-300">
          <ArrowBack className="transition-transform duration-300" />
          <Link href="/" className="ml-2">
            {" "}
            Back To Home{" "}
          </Link>
        </div>
        <div className="bg-purple-600 w-screen h-screen flex items-center justify-center p-6">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
