"use client"

import { CreateUserForm } from "@/components/CreateUserForm"
import MedicalEquipmentManagement from "@/components/MedicalEquipmentManagement";
import SelectTab from "@/components/SelectTab"
import { getCredentials } from "@/lib/creds";
import Link from "next/link";
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
            {!pending && !auth && <div>Unauthorized</div>}
            {!pending && auth && (
                <div>
                    <SelectTab options={[
                        { name: 'Tạo người dùng', value: <CreateUserForm /> },
                        { name: 'Quản lý trang thiết bị y tế', value: <MedicalEquipmentManagement /> },
                        { name: 'Quản lý thuốc', value: <Link href="/admin/medicine"><a>Quản lý thuốc</a></Link>}
                    ]} />
                </div>
            )}
        </>
    )
}
