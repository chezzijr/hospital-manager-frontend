"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Images, Icons } from "@root/public/assets/Images";
import { useAuthContext } from "@/app/contexts/auths";
import { useRouter } from "next/navigation";
import { getCredentials } from "@/lib/creds";

const Header = () => {
    const { isLogin, setIsLogin } = useAuthContext();
    const [userRole, setUserRole] = useState("");
    const [isShowMenuUser, setIsShowMenuUser] = useState(false);


    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("uid");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("idToken");
        localStorage.removeItem("role");
        setIsLogin(false);
        setUserRole("");
        router.push("/");
    };

    useEffect(() => {
        const creds = getCredentials()
        if (creds) {
            axios.defaults.headers.common["authorization"] = `Bearer ${creds.idToken}`;
            setIsLogin(true);
        } else {
            axios.defaults.headers.common["authorization"] = "";
        }
        setIsLogin(creds ? true : false);
        setUserRole(creds ? creds.role : "");
    }, [isLogin, setIsLogin]);


    return (
        <div className="h-20 bg-blue-500 px-16 flex items-center justify-between">
            <Link href={"/"} className="h-20 flex items-center w-2/5">
                <Image
                    src={Images.logo}
                    width={60}
                    height={60}
                    className=""
                    alt="Logo"
                />
                <h1 className="text-2xl font-semibold ml-4 text-white">BKHEALTH</h1>
            </Link>
            {userRole ? (
                <div className="flex items-center justify-between w-3/5">
                    {userRole && userRole == "PATIENT" ? (
                        <div className="flex">
                            <Link
                                href={"/appointment"}
                                className="w-32 h-20 hover:bg-blue-600 flex items-center justify-center"
                            >
                                <button className="text-normal font-medium">
                                    Đặt lịch khám
                                </button>
                            </Link>
                            <Link
                                href={"/view-doctor"}
                                className="w-32 h-20 hover:bg-blue-600 flex items-center justify-center"
                            >
                                <button className="text-normal font-medium">Xem bác sĩ</button>
                            </Link>
                            <Link
                                href={"/feedback"}
                                className="w-32 h-20 hover:bg-blue-600 flex items-center justify-center"
                            >
                                <button className="text-normal font-medium">Đánh giá</button>
                            </Link>
                            <Link
                                href={"/profile"}
                                className="w-32 h-20 hover:bg-blue-600 flex items-center justify-center"
                            ><button className="text-normal font-medium">Hồ sơ</button></Link>
                        </div>
                    ) : (
                        <div>
                            <nav className="flex">
                                <Link
                                    href={"/"}
                                    className="w-32 h-20 hover:bg-blue-600 flex items-center justify-center"
                                >Trang chủ</Link>
                                {
                                    userRole != "ADMIN" &&
                                    <Link
                                        href={"/profile"}
                                        className="w-32 h-20 hover:bg-blue-600 flex items-center justify-center"
                                    >Hồ sơ</Link>
                                }
                                {
                                    userRole == "ADMIN" &&
                                    <Link
                                        href={"/admin"}
                                        className="w-32 h-20 hover:bg-blue-600 flex items-center justify-center"
                                    >Quản trị</Link>
                                }
                                {
                                    userRole == "DOCTOR" &&
                                    <Link
                                        href={"/pending-appointment"}
                                        className="w-32 h-20 hover:bg-blue-600 flex items-center justify-center"
                                    >Cuộc hẹn</Link>
                                }
                                <Link
                                    href={"/"}
                                    className="w-32 h-20 hover:bg-blue-600 flex items-center justify-center"
                                >Trợ giúp</Link>
                            </nav>
                        </div>
                    )}

                    <div className="relative">
                        <Image
                            src={Icons.avatar}
                            alt="Avatar"
                            className="w-12 h-12 hover:cursor-pointer"
                            onClick={() => setIsShowMenuUser(!isShowMenuUser)}
                        />
                        {isShowMenuUser ? (
                            <div className="absolute top-16 left-0 w-28 flex items-center justify-center h-10 bg-slate-300 hover:bg-slate-400 rounded-lg">
                                <button onClick={handleLogout} className="">
                                    Đăng xuất
                                </button>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex">
                    <Link
                        href={"/register"}
                        className="w-32 h-20 hover:bg-blue-600 flex items-center justify-center"
                    >
                        <button className="text-normal font-medium">Đăng kí</button>
                    </Link>
                    <Link
                        href={"/login"}
                        className="w-32 h-20 hover:bg-blue-600 flex items-center justify-center"
                    >
                        <button className="text-normal font-medium underline">
                            Đăng nhập
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
