import Image from "next/image";
import React from "react"
import { usePath } from "@/lib/hooks/path";

export default function Header() {
    return(
        <header className="navigation_bar">
        <Image
          src={usePath("/images/01_logobachkhoasang.png")}
          alt=""
          className="logo_img"
          width={70}
          height={50}
        />
        <a href="#home">Trang chủ</a>
        <a href="#news">Tin tức</a>
        <a href="#contact">Liên hệ</a>
        <a href="#help">Hỗ trợ</a>
        <a href="#notification">Thông báo</a>
      </header>
    );
}
