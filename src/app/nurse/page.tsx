"use client"
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import '@/app/styles/color.css';
import { getCredentials } from '@/lib/creds';


const NurseProfile = () => {
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [workingHours, setWorkingHours] = useState('');
    const [yearOfExperience, setYearOfExperience] = useState('');
    const [department, setDepartment] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const creds = getCredentials()
        if (!creds) {
            window.location.href = "/login"
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
                name,
                dateOfBirth,
                gender,
                phoneNumber,
                workingHours,
                yearOfExperience,
                department
            })
        }).then(res => {
            if (res.ok) {
                window.location.href = "/profile"
                return
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Nurse Profile</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">Họ tên</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Họ tên"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="dateOfBirth" className="sr-only">Ngày sinh</label>
                            <input
                                id="dateOfBirth"
                                name="dateOfBirth"
                                type="date"
                                autoComplete="bday"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Ngày sinh"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="gender" className="sr-only">Giới tính</label>
                            <select
                                id="gender"
                                name="gender"
                                autoComplete="sex"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Giới tính</option>
                                <option value="Male">Nam</option>
                                <option value="Female">Nữ</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="phoneNumber" className="sr-only">Số điện thoại</label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="text"
                                pattern="\d*"
                                autoComplete="tel"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Số điện thoại"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="workingHours" className="sr-only">Giờ làm việc</label>
                            <input
                                id="workingHours"
                                name="workingHours"
                                type="number"
                                autoComplete="work-hours"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Giờ làm việc"
                                value={workingHours}
                                onChange={(e) => setWorkingHours(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="yearOfExperience" className="sr-only">Số năm kinh nghiệm</label>
                            <input
                                id="yearOfExperience"
                                name="yearOfExperience"
                                type="number"
                                autoComplete="experience"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Số năm kinh nghiệm"
                                value={yearOfExperience}
                                onChange={(e) => setYearOfExperience(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="department" className="sr-only">Khoa</label>
                            <input
                                id="department"
                                name="department"
                                type="text"
                                autoComplete="department"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Khoa"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Hoàn tất
                        </button>
                    </div>
                </form>
                {error && <p className="text-red-500 text-center">{error}</p>
            </div>
        </div>
    );
};

export default NurseProfile;
