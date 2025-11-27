import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/components/Header";
import Footer from "@/components/components/Footer";
import TravelLineLoader from "@/components/components/TravellineLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Отель Культура",
  description: "Отель Культура в Гродно",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Loads TravelLine scripts safely on client */}
        <TravelLineLoader />

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
