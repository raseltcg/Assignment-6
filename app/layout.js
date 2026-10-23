import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "FitLog — Workout Library",
  description:
    "Pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${oswald.variable} ${inter.variable} flex min-h-screen flex-col bg-white font-sans text-slate-900`}
      >
        <PlanProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}