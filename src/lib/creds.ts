import { Credentials } from '@/types/auth';
import { hashCode } from './hash';
import { useState } from 'react';

export function hashCreds(creds: Credentials) {
    let s = creds.uid + creds.role + creds.idToken + creds.refreshToken;
    return hashCode(s);
}

export function getCredentials(): Credentials | null {
    if (!isStoringCreds()) {
        return null
    }

    return {
        uid: localStorage.getItem('uid') || '',
        role: localStorage.getItem('role') || '',
        idToken: localStorage.getItem('idToken') || '',
        refreshToken: localStorage.getItem('refreshToken') || '',
        emailVerified: localStorage.getItem('emailVerified') === 'true',
    };
}

export function isStoringCreds() {
    const itemList = ['uid', 'role', 'idToken', 'refreshToken', 'hashCreds'];
    for (const item of itemList) {
        if (!localStorage.getItem(item)) {
            return false
        }
    }
    const creds: Credentials = {
        uid: localStorage.getItem('uid') || '',
        role: localStorage.getItem('role') || '',
        idToken: localStorage.getItem('idToken') || '',
        refreshToken: localStorage.getItem('refreshToken') || '',
        emailVerified: true, // we can ignore this for now
    };

    const storedHashCreds = localStorage.getItem('hashCreds');

    if (hashCreds(creds).toString() !== storedHashCreds) {
        return false
    }

    return true
}

export function refresh() {
    const creds = getCredentials();
    if (!creds) {
        window.location.href = '/login';
        return;
    }

    const refreshToken = creds.refreshToken;
    const url = process.env.NEXT_PUBLIC_API_URL + '/auth/refreshToken';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error) {
                window.location.href = '/login';
            } else {
                const { accessToken, refreshToken } = data;
                localStorage.setItem('idToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                creds.idToken = accessToken;
                creds.refreshToken = refreshToken;
                const hash = hashCreds(creds);
                localStorage.setItem('hashCreds', hash.toString());
                // refresh page
                window.location.reload();
            }
        })
        .catch((err) => {
            window.location.href = '/login';
        })
}
