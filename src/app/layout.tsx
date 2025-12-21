import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ApniSec | Cybersecurity Made Simple",
  description:
    "ApniSec provides Cloud Security, Red Team Assessments, and VAPT services.",
  keywords: ["Cybersecurity", "Cloud Security", "VAPT", "ApniSec"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">{children}</body>
    </html>
  );
}
