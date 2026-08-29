import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VidAI Music Videostudio",
  description: "KI-Musikvideostudio mit Next.js und Runway",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
