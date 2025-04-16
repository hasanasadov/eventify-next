import QueryProvider from "@/providers/QueryProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "sonner";
import "../globals.css";
// import store from "@/store";
// import { Provider } from "react-redux";

export const metadata = {
  title: "My Events",
  description: "My Events App",
  verification: {
    google: "Kgwc7apwSgQ78KHX9S3HLqqZCET7TAQk-OGZJGVJ1mg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
    </html>
  );
}
