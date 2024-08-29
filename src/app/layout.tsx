import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Edupad",
  description: "Token launchpad",
  icons: "/edupad.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#f5f5f5] dark:bg-[#060d30]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
