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

export default function Help() {
    return (
      <div className="home">
        <Header/ >
        {/*Thiết lập tiêu đề trang web*/}
        <div className="flex items-center justify-center h-screen">
            <div className="max-w-3xl mx-auto p-6"> 
                <div className="bg-gray-100 p-6 rounded-lg"> 
                    <h2 className="text-xl font-semibold mb-2">Thông tin hỗ trợ</h2>
                    <p>Email hỗ trợ: support@example.com</p>
                    <p>Số điện thoại hỗ trợ: 0123-456-789</p>
                    <p>Văn phòng hỗ trợ trực tiếp: 123 Đường ABC, Thành phố XYZ</p>
                </div>
            </div>
            <div className="max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Câu hỏi thường gặp</h2>
                <div className="border-t border-gray-300 py-4">
                    <p className="font-semibold mb-2">Tôi không nhớ tên tài khoản/ mật khẩu mình đang sử dụng.</p>
                    <p>Tại Trang chủ, bạn truy cập vào Đăng ký tài khoản, chọn Quên mật khẩu và làm theo các hướng dẫn, bạn cần cung cấp email và số điện thoại đã đăng ký tài khoản để có thể được hỗ trợ lấy lại tài khoản.</p>
                </div>
                <div className="border-t border-gray-300 py-4">
                    <p className="font-semibold mb-2">Tôi không còn nhu cầu sử dụng tài khoản và mong muốn được huỷ tài khoản.</p>
                    <p>Các thông tin của người dùng được chúng tôi cam kết bảo mật và không sử dụng cho bất kỳ mục đích nào khác. Nếu bạn có nhu cầu xoá thông tin tài khoản, bạn có thể đến văn phòng hỗ trợ trực tiếp hoặc liên hệ qua số điện thoại hỗ trợ khách hàng để được hướng dẫn xoá tài khoản.</p>
                </div>
                {/* Thêm các câu hỏi và câu trả lời khác nếu cần */}
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
  