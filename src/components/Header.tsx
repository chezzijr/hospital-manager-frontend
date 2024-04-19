import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Images } from "@root/public/assets/Images";

const Header = () => {
  return (
    <div className="h-20 bg-blue-500 px-16 flex items-center justify-between">
      <Link href={'/'} className="h-20 flex items-center">
        <Image
          src={Images.logo}
          width={60}
          height={60}
          className=""
          alt="Logo"
        />
        <h1 className="text-2xl font-semibold ml-4 text-white">BKHEALTH</h1>
      </Link>
      <div className="flex">
        <Link href={'/register'} className="w-32 h-20 hover:bg-blue-600 flex items-center justify-center">
          <button className="text-normal font-medium">Đăng kí</button>
        </Link>
        <Link href={'/login'} className="w-32 h-20 hover:bg-blue-600 flex items-center justify-center">
          <button className="text-normal font-medium underline">
            Đăng nhập
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
