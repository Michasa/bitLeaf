import dotenv from "dotenv";
dotenv.config();
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Orbitron } from "next/font/google";
import { cn } from "@/lib/utils";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(orbitron.variable, "h-full bg-white")}>
      <body>{children}</body>
      <Toaster />
    </html>
  );
}
