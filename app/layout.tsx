import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

export const metadata: Metadata = {
  title: "AI Doubt Solver",
  description: "AI Doubt Solver",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-900 pt-20">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
