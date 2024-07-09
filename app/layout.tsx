import type { Metadata } from "next";
import {Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Global Chal",
  description: "Talk with Global Users",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
              <Toaster />
      <body className={`${inter.className} w-full h-screen bg-gray-950 text-gray-50`}>{children}</body>
    </html>
  );
}
