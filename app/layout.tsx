import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dream Match",
  description: "One match. That's the point.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
