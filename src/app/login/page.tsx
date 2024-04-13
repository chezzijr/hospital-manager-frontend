import React, { useState, ChangeEvent } from "react";
import Link from "next/link";

interface User {
  email: string;
  password: string;
}

const Login = () => {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const handleUserInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="w-full h-full top-0 left-0 flex items-center justify-center absolute bg-slate-100">
      <div className="w-[24rem] bg-white px-8 rounded-xl pb-12">
        <h1 className="text-xl font-semibold mt-10 flex justify-center">
          Đăng nhập
        </h1>

        <div className="">
          <h2 className="text-base font-medium mt-12">Email</h2>
          <input
            className="w-80 h-10 border-2 border-gray-600 px-2 py-1 focus:outline-none rounded-lg"
            placeholder="Nhập email của bạn"
            name="email"
            value={user.email}
            onChange={handleUserInfoChange}
          />
        </div>

        <div className="">
          <h2 className="text-base font-medium mt-6">Password</h2>
          <input
            className="w-80 h-10 border-2 border-gray-600 px-2 py-1 focus:outline-none rounded-lg"
            placeholder="Nhập password của bạn"
            name="password"
            value={user.password}
            onChange={handleUserInfoChange}
          />
        </div>

        <div className="mt-16">
          <button className="w-80 h-12 bg-blue-600 text-lg font-semibold text-white rounded-xl hover:bg-blue-700">
            Đăng nhập
          </button>
        </div>

        <div className="mt-4 flex-end pb-10">
          <p className="text-xs pr-2">Chưa có tài khoản?</p>
          <Link href={"/register"} className="text-xs underline">
            Đăng kí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
