import "@/styles/globals.css";
import CustomLayout from "@/providers/CustomLayout";

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
      <body>
        <CustomLayout>{children}</CustomLayout>
      </body>
    </html>
  );
}
