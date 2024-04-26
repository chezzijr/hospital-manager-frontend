import { Credentials } from '@/types/auth';
import { hashCode } from './hash';

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
