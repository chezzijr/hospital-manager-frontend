import Image from "next/image";
import React from "react"
import { usePath } from "@/lib/hooks/path";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "BKCare",
    description: "Trang chủ của ứng dụng quản lý bệnh viện",
    icons: "/favicon.ico",
}

import { Images } from '../../public/assets/Images';

export default function Home() {
  return (
    <main className="flex items-center justify-center mt-4">
      <Image
        src={Images.background}
        width={1000}
        height={1000}
        className=""
        alt="Background"
      />
    </main>
  );
}
