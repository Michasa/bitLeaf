import dotenv from "dotenv";
dotenv.config();
import "./globals.css";
import { Orbitron } from "next/font/google";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const Toaster = dynamic(
  () => import("../../src/components/ui/toaster").then((mod) => mod.Toaster),
  {
    ssr: false,
  },
);

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
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
