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

export default function News() {
    return (
      <div className="home">
        <Header/ >
        <div className="p-4 bg-white rounded-lg shadow-md mb-4 mt-14">
            <h2 className="text-xl font-semibold mb-2">Chương trình chăm sóc sức khoẻ cộng đồng: Hướng dẫn chăm sóc sức khoẻ miễn phí cho người cao tuổi.</h2>
            <p className="text-gray-600 mb-2">Ngày đăng: 02/01/2024</p>
            <p className="mb-4">Trong nỗ lực nâng cao chất lượng cuộc sống của cộng đồng, Bệnh viện Đa khoa BKCare tổ chức một chương trình chăm sóc sức khỏe cộng đồng dành riêng cho người cao tuổi. Chương trình cung cấp và tư vấn về các dịch vụ y tế cơ bản miễn phí, bao gồm:</p>
            <ul className="list-disc pl-6 mb-4">
                <li>Khám sức khỏe tổng quát</li>
                <li>Kiểm tra huyết áp</li>
                <li>Đo đường huyết</li>
                <li>Tư vấn dinh dưỡng</li>
                <li>Gợi ý lối sống lành mạnh</li>
            </ul>
            <p className="mb-4">Thời gian tổ chức chương trình: từ 8 giờ 00 phút đến 14 giờ 00 phút ngày 10/01/2024.</p>
            <p className="mb-4">Địa điểm tổ chức chương trình: hội trường số 1, tầng 2 tại Bệnh viện Đa khoa BKCare.</p>
            <p className="mb-4">Nếu quý vị hoặc người thân của quý vị là người cao tuổi và quan tâm đến chăm sóc sức khỏe, xin đừng ngần ngại tham gia chương trình này để nhận được các dịch vụ y tế cơ bản và tư vấn từ đội ngũ y tế chuyên nghiệp của chúng tôi.</p>
            <p className="mb-4">Để biết thêm thông tin chi tiết, xin liên hệ qua số điện thoại: 0111-111-111 hoặc email communityhealth@bkcare.com</p>
            <p className="mb-4">Trân trọng cảm ơn!</p>
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