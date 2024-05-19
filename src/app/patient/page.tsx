"use client"
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import '@/app/styles/color.css';
import { getCredentials } from '@/lib/creds';

const PatientProfile = () => {
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Name:', name, 'Date of Birth:', dateOfBirth, 'Gender:', gender);
        const creds = getCredentials()
        if (!creds) {
            window.location.href = "/login"
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
                name,
                dateOfBirth,
                gender
            })
        }).then(res => {
            if (res.ok) {
                window.location.href = "/profile"
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
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Patient Profile</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
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
                            <label htmlFor="dateOfBirth" className="sr-only">Date of Birth</label>
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
                            <label htmlFor="gender" className="sr-only">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                autoComplete="sex"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="">Giới tính</option>
                                <option value="Male">Nam</option>
                                <option value="Female">Nữ</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default PatientProfile;
