import Image from "next/image";
import React from "react"
import { usePath } from "@/lib/hooks/path";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="home">
      <Header/ >
      {/*Thiết lập tiêu đề trang web*/}
      <head>
        <title>BKCare</title>
        <meta name="description" content="Trang chủ của ứng dụng quản lý bệnh viện" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <div className="homeContent">
        <h1>TRANG CHỦ HỆ THỐNG QUẢN LÝ BỆNH VIỆN BKCARE</h1>
      </div>
      <div className="aboutApp">
        <p>Bài tập lớn môn học Lập trình nâng cao - Học kỳ 232</p>
      </div>
      <div className="button">
        <button className="loginButton">
          Đăng nhập tài khoản
        </button>
        <button className="signupButton">
          Đăng ký tài khoản
        </button>
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
