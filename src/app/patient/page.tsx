"use client"
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import '@/app/styles/color.css';
import { getCredentials } from '@/lib/creds';

export default function UserProfile() {
    const router = useRouter();
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        gender: '',
    });

    const redirectToHomePage = () => {
        router.push("/trangchu.html");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const creds = getCredentials()
        if (!creds) {
            router.push("/login")
            return
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/patient/setupProfile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${creds.idToken}`
            },
            body: JSON.stringify({
                id: creds.uid,
                ...formData
            })
        }).then(res => {
            if (res.ok) {
                router.push("/profile")
            } else {
                res.json().then(data => {
                    setError(data)
                })
            }
        }).catch(err => {
            setError(err)
        })

    };

    return (
        <>
            <Head>
                <title>Hồ Sơ Bệnh Nhân</title>
            </Head>
            <div className="top">
                <div className="container">
                    <div className="header">
                        <div className="menu-left">
                            <div className="menu-item"><Link href="/trangchu.tsx">Trang chủ</Link></div>
                            <div className="menu-item"><Link href="/drinfo.tsx">Thông tin bác sĩ</Link></div>
                            <div className="menu-item"><Link href="/nurseinfo.tsx">Thông tin y tá</Link></div>
                        </div>
                        <div className="menu-right">
                            <div className="notifications">
                                Thông báo
                                <div className="notifications-dropdown">
                                    <ul>
                                        <li><Link href="/info1.tsx">Tin tức 1</Link></li>
                                        <li><Link href="/info2.tsx">Tin tức 2</Link></li>
                                        <li><Link href="/info3.tsx">Tin tức 3</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <button onClick={redirectToHomePage}>Thoát</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container" style={{ background: 'rgb(206, 206, 239)' }} >
                <h1 > Hồ Sơ Bệnh Nhân</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Họ và Tên:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                    <label htmlFor="dob">Ngày Sinh:</label>
                    <input type="date" id="dob" name="dob" value={formData.dateOfBirth} onChange={handleChange} required />

                    <label htmlFor="gender">Giới Tính:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                    </select>

                    <button type="submit" style={{ textAlign: 'center' }} >
                        Lưu
                    </button>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </>
    );
}
