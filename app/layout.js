import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "FitLog — Workout Library",
  description:
    "Pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"> 
      <body
        className={`${oswald.variable} ${inter.variable} font-sans bg-white text-slate-900`}
      >
        <PlanProvider>{children}</PlanProvider>
      </body>
    </html>
  );
}