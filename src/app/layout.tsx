import "./globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
const raleway = Raleway({ subsets: ["latin"], variable: "--font-rale" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={raleway.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
