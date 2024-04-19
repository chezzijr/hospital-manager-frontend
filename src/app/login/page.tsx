import Login from "@/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Đăng nhập",
    description: "Trang đăng nhập của ứng dụng quản lý bệnh viện",
};

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <Login />
            </div>
        </div>
    );
}
