'use client';
import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

interface AuthContextType {
  SERVER_URL: string;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
  SERVER_URL: "",
  isLogin: false,
  setIsLogin: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const SERVER_URL = "http://localhost:8081/api";
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("JWT")) {
      setIsLogin(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        SERVER_URL,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLogin } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    if (!isLogin && pathname !== "/login") {
      router.push("/login");
    }
  }, [isLogin, pathname, router]);

  return <>{children}</>;
};
