import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata = {
  title: "My Events",
  description: "My Events App",
  verification: {
    google: "Kgwc7apwSgQ78KHX9S3HLqqZCET7TAQk-OGZJGVJ1mg",
  },
};

export default function RootLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="!p-6 md:!px-0 min-h-[70vh] bg-gray-50 dark:bg-black">
        {children}
      </div>
      <Footer />
    </div>
  );
}
