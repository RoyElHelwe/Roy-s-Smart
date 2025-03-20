// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import FloatingPreOrderButton from "@/components/layout/FloatingPreOrderButton";

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
        {/* Main content */}
        {children}

        {/* Footer */}
        <Footer />

        {/* Floating Pre-Order Button */}
        <FloatingPreOrderButton />
      </body>
    </html>
  );
}
