import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { AuthProvider, ProtectedRoute } from "@/app/contexts/auths";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BKCare",
  description: "Ứng dụng bệnh viện trực thuộc đại học đầu hàng công nghệ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-full`}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
