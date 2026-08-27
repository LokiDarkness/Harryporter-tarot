import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mystic Oracle | Nghi thức định mệnh",
  description: "Một không gian suy ngẫm huyền bí được dẫn dắt bởi AI.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
