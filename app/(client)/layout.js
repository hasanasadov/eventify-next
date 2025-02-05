import QueryProvider from "@/providers/QueryProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "sonner";
import "../globals.css";
import { Suspense } from "react";
// import store from "@/store";
// import { Provider } from "react-redux";

export const metadata = {
  title: "myevent.az",
  description: "My Event app for all your event needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Suspense fallback={<div>Loading...</div>}>
        {/* <Provider store={store}> */}
        <body className="mb-[40px] lg:mb-0">
          <Navbar />
          <main className="flex-grow">
            <QueryProvider>{children}</QueryProvider>
          </main>
          <Footer />
          <Toaster />
        </body>
        {/* </Provider> */}
      </Suspense>
    </html>
  );
}
