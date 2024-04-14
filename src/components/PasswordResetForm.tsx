"use client"
import { FormEvent, useState } from 'react';

export default function PasswordResetForm() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle forgot password logic here
        setSubmitted(true);

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resetPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        }).then(async (res) => {
            if (!res.ok) {
                const data = await res.json();
                setError(data.message);
            } else {
                alert('An email has been sent to your email address');
            }
        }).catch((error) => {
            setError('An error occurred: ' + error.message);
        })
    };

    return (
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
                        placeholder="địa chỉ email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <button
                    type="submit"
                    disabled={submitted}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Gửi yêu cầu
                </button>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
        </form>

    )
}
