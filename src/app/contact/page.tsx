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

export default function Contact() {
    return (
      <div className="home">
        <Header/ >
        <div className="p-4 bg-white rounded-lg shadow-md mb-4 mt-14">
            <h2 className="text-xl font-semibold mb-2">Trong trường hợp cần thiết, bệnh nhân hoặc bác sĩ có thể liên hệ trực tiếp qua các số điện thoại sau:</h2>
            <p className="mb-4">Số điện thoại khẩn cấp: 0111-222-333</p>
            <p className="mb-4">Số điện thoại của bộ phận hỗ trợ kỹ thuật: 0999-888-777</p>
            <p className="mb-4">Số điện thoại của Văn phòng Khoa: 8765-4321, số nội bộ: 0000</p>
            <p className="mb-4">Số điện thoại tiếp nhận bệnh nhân: 0444-555-666</p>
        </div>
        
        <Image
          src={usePath("/images/background.jpg")}
          alt="Background Image"
          className="backgroundimg"
          fill = {true}
        />
        <Footer/ >
      </div>
    );
}