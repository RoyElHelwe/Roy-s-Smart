// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Roy's Smart",
    default: "Roy's Smart - The Ultimate Portable Workstation",
  },
  description:
    "Portable & Foldable Workstation with power and connectivity for professionals on the move.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen`}>
        <Navbar />
        {/* Main content */}
        {children}

        {/* Footer */}
        <Footer />

      </body>
    </html>
  );
}
