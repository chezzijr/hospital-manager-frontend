import React from "react";
import Link from "next/link";

const Login = () => {
  return (
    <div className="w-full h-full top-0 left-0 flex items-center justify-center absolute bg-slate-100">
      <div className="w-[24rem] bg-white px-8 rounded-xl pb-12">
        <h1 className="text-xl font-semibold mt-10 flex justify-center">
          Đăng kí
        </h1>

        <div className="">
          <h2 className="text-base font-medium mt-12">Email</h2>
          <input className="w-80 h-10 border-2 border-gray-600 px-2 py-1 focus:outline-none rounded-lg" placeholder="Nhập email của bạn" value="" />
        </div>

        <div className="">
          <h2 className="text-base font-medium mt-6">Password</h2>
          <input className="w-80 h-10 border-2 border-gray-600 px-2 py-1 focus:outline-none rounded-lg" placeholder="Nhập password của bạn" value="" />
        </div>

        <div className="w-full flex-start flex-col mt-1 mb-3">
          <label className="w-80 text-base font-semibold mb-1">Vai trò</label>
          <select
            id="role"
            className="w-80 h-8 text-base font-normal mb-1"
          >
            <option className="text-base font-normal">Chọn vai trò của bạn</option>
            <option className="text-base font-normal" value="PATIENT">Bệnh nhân</option>
            <option className="text-base font-normal" value="DOCTOR">Bác sĩ</option>
            <option className="text-base font-normal" value="NURSE">Y tá</option>
          </select>
        </div>

        <div className="mt-16">
          <button className="w-80 h-12 bg-blue-600 text-lg font-semibold text-white rounded-xl hover:bg-blue-700">Đăng kí</button>
        </div>

        <div className="mt-4 flex-end pb-10">
          <p className="text-xs pr-2">Đã có tài khoản?</p>
          <Link href={'/login'} className='text-xs underline'>Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
