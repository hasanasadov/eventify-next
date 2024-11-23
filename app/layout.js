import Navbar from "@/components/shared/Navbar";
import "./globals.css";

import Footer from "@/components/shared/Footer";

export const metadata = {
  title: "Eventify",
  description: "Eventify app for all your event needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <Navbar />

        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
