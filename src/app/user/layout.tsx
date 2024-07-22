import type { Metadata } from "next";
// import "./globals.css";
import { Navigation } from "../../components";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Kiti | user",
  description: "Kiti bus management user section",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="english">
      <head>
        <meta name="viewport" />
      </head>
      <body className="font-Inter-Regular flex flex-col min-h-screen">
        <Navigation />
        <div className="py-5 flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
