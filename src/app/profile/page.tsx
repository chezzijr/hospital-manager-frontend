"use client"

import { getCredentials } from '@/lib/creds';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const [profile, setProfile] = useState<any>(null);
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
        <>
            {profile && <ProfileRenderer profile={ profile } />}
            {!profile && !error && <div className="text-center">Loading...</div>}
            {!profile && error && <div className="text-center text-red-500">{error}</div>}
        </>
    );
}

function ProfileRenderer({ profile }: { profile: any }) {
    const creds = getCredentials();
    if (!creds) {
        window.location.href = '/login';
        return;
    }
    const role = creds.role.toLowerCase();
    const array = Object.entries(profile[role]);
    const items = array.filter(([key, value]) => key && value).map(([key, value]) => {
        return (
            <div key={key} className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">{key}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{value}</dd>
            </div>
        );
    })

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">User Profile</h3>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    {items}
                </dl>
            </div>
        </div>
    );
}
