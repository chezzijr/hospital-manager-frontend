"use client"

import { getCredentials } from '@/lib/creds';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const creds = getCredentials()
        if (!creds) {
            window.location.href = '/login';
            return
        }

        let path = ""
        const role = creds.role;
        if (role === 'DOCTOR') {
            path = 'doctor'
        } else if (role === 'PATIENT') {
            path = 'patient'
        } else if (role === 'ADMIN') {
            path = 'admin'
        } else {
            window.location.href = '/login';
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}/${creds.uid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + creds.idToken,
            },
        }).then(async (res) => {
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                if (data) {
                    setProfile(data);
                } else {
                    setError('No data found');
                }
            } else {
                window.location.href = '/' + path;
            }
        }).catch((error) => {
            setError('An error occurred: ' + error.message);
        })
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <div>
                {JSON.stringify(profile, null, 2)}
            </div>
            {error && <div className="text-red-500">{error}</div>}
        </div>
    );
}
