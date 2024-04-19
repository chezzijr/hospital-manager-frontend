"use client"

import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const uid = localStorage.getItem('uid');
        if (!uid) {
            window.location.href = '/login';
        }

        let path = ""
        const role = localStorage.getItem('role');
        if (role === 'DOCTOR') {
            path = '/doctor'
        } else if (role === 'PATIENT') {
            path = '/patient'
        } else if (role === 'ADMIN') {
            path = '/admin'
        } else {
            window.location.href = '/login';
        }
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}/${uid}`, {
            method: 'GET',
        }).then(async (res) => {
            if (res.ok) {
                const data = await res.json();
                setProfile(data);
            } else {
                const data = await res.json();
                setError(data.message);
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
        </div>
    );
}
