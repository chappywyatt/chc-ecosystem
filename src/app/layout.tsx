import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CHC Digital Ecosystem",
  description:
    "Chaplain Corps Digital Ecosystem — Integrated tools for readiness, development, and capability analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
