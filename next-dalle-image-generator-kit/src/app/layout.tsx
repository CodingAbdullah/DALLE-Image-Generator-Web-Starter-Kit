import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Root layout metadata for the project
export const metadata: Metadata = {
  title: "DALL·E Image Generator",
  description: "Generate AI-powered images with DALL·E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100`}
        >
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
