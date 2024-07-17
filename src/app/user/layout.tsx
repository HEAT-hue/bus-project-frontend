import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import { Navigation } from "../components";
import Footer from "../components/Footer";
import { Suspense } from "react";
// import { viewport } from "./viewport";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

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
