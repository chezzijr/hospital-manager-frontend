"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import '@/app/styles/color.css';
import { getCredentials } from '@/lib/creds';
import Head from 'next/head';

export default function UserProfile() {
    const router = useRouter();
    const [error, setError] = useState("")

    useEffect(() => {
        const creds = getCredentials()
        if (!creds) {
            router.push("/login")
            return
        }

        // fetch data
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctor/${creds.uid}`)
            .then((res) => {
                if (res.ok) {
                    router.push("/profile")
                }
            })
            .catch(err => {
                setError(err)
            })
    }, [])

    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        gender: '',
        phoneNumber: '',
        workingHours: 0,
        specialization: '',
        qualification: '',
        yearOfExperience: 0
    });

    const redirectToHomePage = () => {
        router.push("/");
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

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctor/setupProfile`, {
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
                <title>Thông tin bác sĩ</title>
            </Head>

            <div>
                <div className="top">
                    <div className="container">
                        <div className="header">
                            <div className="menu-left">
                                <div className='menu-item'><Link href="/trangchu.tsx">Trang chủ</Link></div>
                                <div className='menu-item'><Link href="/drinfo.tsx">Thông tin bệnh nhân</Link></div>
                                <div className='menu-item'><Link href="/nurseinfo.tsx">Thông tin y tá</Link></div>
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
                    <h1 > Thông tin bác sĩ</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="left-form">
                            <label htmlFor="name">Họ và Tên:</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                            <label htmlFor="dateOfBirth">Ngày Sinh:</label>
                            <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />

                            <label htmlFor="gender">Giới Tính:</label>
                            <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>

                                <label htmlFor="phone">Số điện thoại:</label>
                                <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                            </select>

                            <button type="submit" style={{ textAlign: 'center' }} >
                                Lưu
                            </button>
                        </div>

                        <div className="right-form">
                            <label htmlFor="schedule">Thời gian hoạt động:</label>
                            <input type="number" id="workingHours" name="workingHours" value={formData.workingHours} onChange={handleChange} required />

                            <label htmlFor="specialization">Chuyên khoa:</label>
                            <input type="text" id="specialization" name="specialization" value={formData.specialization} onChange={handleChange} required />

                            <label htmlFor="qualification">Trình độ chuyên môn:</label>
                            <input type="text" id="qualification" name="qualification" value={formData.qualification} onChange={handleChange} required />

                            <label htmlFor="yearOfExperience">Số năm kinh nghiệm:</label>
                            <input type="number" id="yearOfExperience" name="yearOfExperience" value={formData.yearOfExperience} onChange={handleChange} required />
                        </div>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                    </form>
                </div>
            </div>
        </>
    );
}
