import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { NextScript } from "next/document";
import Navbar from "@/components/Navbar/Navbar";
import { Raleway } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */
const raleway = Raleway({ subsets: ["latin"], variable: "--font-rale" });

export const metadata: Metadata = {
  title: "Kythira",
  description: "Navigate through K8s with ease.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={raleway.className}>
          <Script id="theme-switch" strategy="beforeInteractive">
            {`if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}
`}
          </Script>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
