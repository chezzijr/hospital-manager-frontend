"use client"

import { getCredentials } from "@/lib/creds"
import { useEffect, useState } from "react"

type MedicalEquipment = {
    id: string
    name: string
    available: boolean
    latestUsageDate: Date
    latestMaintenanceDate: Date
    isBeingUsedBy: string
    importedDate: Date
    usageHistory: {
        startDate: Date
        endDate: Date
        assignedTo: string
    }[]
}

export default function MedicalEquipmentManagement() {
    const [medicalEquipment, setMedicalEquipment] = useState<MedicalEquipment[]>([])
    const [pending, setPending] = useState(true)
    const [error, setError] = useState('')

    const [name, setName] = useState('')
    const [latestMaintenanceDate, setLatestMaintenanceDate] = useState(new Date())

    function fetchMedicalEquipment() {
        const creds = getCredentials()
        if (!creds) {
            setPending(false)
            return
        }

        // fetch medical equipment
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/medicalEquipment/getAll`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${creds.idToken}`
            },
        }).then(async res => {
            if (res.ok) {
                setMedicalEquipment(await res.json())
            } else {
                setError(await res.text())
            }
            setPending(false)
        }).catch(err => {
            setError(err.message)
            setPending(false)
        })
    }

    useEffect(() => {
        const creds = getCredentials()
        if (!creds) {
            setPending(false)
            return
        }

        // fetch medical equipment
        fetchMedicalEquipment()
    }, [])

    function submitForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const creds = getCredentials()
        if (!creds) {
            setError('Unauthorized')
            return
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/medicalEquipment/add`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${creds.idToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                latestMaintenanceDate,
            }),
        }).then(async res => {
            if (res.ok) {
                // refresh medical equipment
                fetchMedicalEquipment()
            } else {
                setError(await res.text())
            }
        }
        ).catch(err => {
            setError(err.message)
        })
    }

    return (
        <>
        {pending && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        <div className="flex">
            <form className="m-2 p-2 flex flex-col" onSubmit={submitForm}>
                <h1>Thêm trang thiết bị y tế</h1>
                <label htmlFor="name">Tên</label>
                <input type="text" placeholder="Tên" value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="latestMaintenanceDate">Ngày bảo trì gần nhất</label>
                <input type="date" placeholder="Ngày bảo trì gần nhất" onChange={(e) => setLatestMaintenanceDate(new Date(e.target.value))} />
                <button type="submit">Thêm</button>
            </form>
            <div>
                <h1>Danh sách trang thiết bị y tế</h1>
                <div className="flex justify-stretch">
                    {medicalEquipment.map((equipment, index) => (
                        <div className="m-2 p-2 rounded border-2" key={index}>
                            <h2>Tên: {equipment.name}</h2>
                            <p>Khả dụng: {equipment.available ? 'Yes' : 'No'}</p>
                            <p>Ngày nhập: {new Date(equipment.importedDate).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}
