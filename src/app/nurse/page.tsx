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
        email: '',
        dateOfBirth: '',
        gender: '',
        workingHours: 0,
        department: '',
        yearOfExperience: 0,
        phoneNumber: '',
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

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/nurse/setupProfile`, {
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
            <div className="top">
                <div className="container">
                    <div className="header">
                        <div className="menu-left">
                            <div className="menu-item"><Link href="/user-management">Trang chủ</Link></div>
                            <div className="menu-item"><Link href="http://localhost:3001/">Thông tin bác sĩ</Link></div>
                            <div className="menu-item"><Link href="/nurseinfo.tsx">Hồ sơ bệnh nhân</Link></div>
                        </div>
                        <div className="menu-right">
                            <div className="notifications">
                                Thông báo
                                <div className="notifications-dropdown">
                                    <ul>
                                        <li><Link href="/info1">Tin tức 1</Link></li>
                                        <li><Link href="/info2">Tin tức 2</Link></li>
                                        <li><Link href="/info3">Tin tức 3</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <button onClick={redirectToHomePage}>Thoát</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ background: 'rgb(206, 206, 239)' }} >
                <h1 > Thông tin y tá</h1>
                <form onSubmit={handleSubmit}>
                    <div className="left-form">
                        <label htmlFor="name">Họ và Tên:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

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
                    </div>

                    <div className="right-form">
                        <label htmlFor="workingHours">Giờ làm việc:</label>
                        <input type="number" id="workingHours" name="workingHours" value={formData.workingHours} onChange={handleChange} required />

                        <label htmlFor="department">Khoa:</label>
                        <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} required />

                        <label htmlFor="yearOfExperience">Số năm kinh nghiệm:</label>
                        <input type="number" id="yearOfExperience" name="yearOfExperience" value={formData.yearOfExperience} onChange={handleChange} required />

                        <label htmlFor="phone">Số điện thoại:</label>
                        <input type="text" pattern="[0-9]+" id="phone" name="phone" value={formData.phoneNumber} onChange={handleChange} required />
                    </div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}

                </form>
            </div>
        </>
    );
}
