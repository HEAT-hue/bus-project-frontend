import type { Metadata } from "next";
import { Navigation } from "../../components";
import Footer from "../../components/Footer";
import NextTopLoader from "nextjs-toploader";
import { getSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Kiti | user",
  description: "Kiti bus management user section",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getSession();

  return (
    <html lang="english">
      <head>
        <meta name="viewport" />
      </head>
      <body className="font-Inter-Regular flex flex-col min-h-screen">

        {/* Top Loader */}
        <div className="z-[99999]">
          <NextTopLoader showSpinner={false} color="#b1dc30" />
        </div>

        {/* Navigation */}
        <Navigation session={session} />

        {/* Children */}
        <div className="py-5 flex-1">{children}</div>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
