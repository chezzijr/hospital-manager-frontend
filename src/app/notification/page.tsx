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

export default function Notification() {
    return (
      <div className="home">
        <Header/ >
        <div className="max-w-md mx-auto mt-10">
            <div className="p-6 bg-white rounded-lg shadow-lg flex"> 
                <div className="mr-6">
                    <h1 className="text-xl font-semibold mb-2">Thông báo quan trọng</h1>
                    <p className="mb-4">Để nâng cấp một số tính năng và tối ưu hoá người dùng, chúng tôi xin phép bảo trì hệ thống trong thời gian 00:00 - 02:00 ngày 01/01/2024.</p>
                    <p className="mb-4">Trong khoảng thời gian bảo trì này, một số các tính năng cho người dùng tạm thời ngưng hoạt động, riêng các chức năng cần thiết hỗ trợ cho các bác sĩ vẫn hoạt động bình thường.</p>
                    <p className="mb-4">Rất mong người dùng thông cảm cho sự bất tiện này. Các chức năng dành cho bệnh nhân hoạt động ổn định trở lại sau thời gian bảo trì.</p>
                    <p>Trân trọng cảm ơn!</p>
                </div>
            </div>
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