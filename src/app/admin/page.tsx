"use client"
import { CreateUserForm } from "@/components/CreateUserForm"
import { getCredentials } from "@/lib/creds";
import { useEffect, useState } from "react"

export default function AdminDashboardPage() {
    const [pending, setPending] = useState(true)
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        const creds = getCredentials()
        if (!creds) {
            setPending(false)
            return
        }
        if (creds.role !== 'ADMIN') {
            setPending(false)
            return
        }

        setAuth(true)
        setPending(false)
    }, []);

    return (
        <>
            {pending && <div>Loading...</div>}
            {pending && !auth && <div>Unauthorized</div>}
            {!pending && auth && (
                <div>
                    <h1>Admin Dashboard</h1>
                    <CreateUserForm />
                </div>
            )}
        </>
    )
}
