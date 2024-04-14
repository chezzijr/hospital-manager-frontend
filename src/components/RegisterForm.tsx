"use client"

import { hashCreds } from '@/lib/creds';
import { hashCode } from '@/lib/hash';
import { Credentials } from '@/types/auth';
import { useState, FormEvent } from 'react';

const Register = () => {
    // const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [pending, setPending] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle registration logic here
        setPending(true);

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, role: "PATIENT" })
        }).then(async (res) => {
            if (res.ok) {
                const data = await res.json() as Credentials
                // Save the token in the local storage
                for (let [key, value] of Object.entries(data)) {
                    localStorage.setItem(key, value.toString());
                }
                localStorage.setItem("hashCreds", hashCreds(data).toString());

                setPending(false);

                // Redirect to the home page
                if (!data.emailVerified) {
                    alert('Please verify your email address');
                } else {
                    // Redirect to the home page
                    window.location.href = '/';
                }
            } else {
                const data = await res.json();
                setError(data.message);
            }
        }).catch((error) => {
            setError('An error occurred: ' + error.message);
        })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Tạo tài khoản bệnh nhân</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Địa chỉ email</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Địa chỉ email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Mật khẩu</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={pending}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg
                                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                                        clipRule="evenodd"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-5a5 5 0 00-5 5c0 2.341 1.793 4.256 4 4.472V17a1 1 0 102 0v-2.528c2.207-.216 4-2.131 4-4.472a5 5 0 00-5-5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                            Đăng ký
                        </button>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
