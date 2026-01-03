import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Battlezone",
  description: "A faithful revival of a forgotten frontier - Classic vector tank combat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
