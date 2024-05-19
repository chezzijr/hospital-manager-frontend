"use client"

import { getCredentials } from '@/lib/creds';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type AppointmentWithId = {
    id: string;
    appointment: {
        id: string;
        patientId: string;
        appointmentDate: string;
        doctorId: string;
        content: string;
        status: string;
        location: {
            address: string;
            floor: string;
            roomNumber: string;
        };
        dateCreated: string;
    };
}

const Appointment = ({ appointmentWithId }: { appointmentWithId: AppointmentWithId }) => {
    const { appointment } = appointmentWithId;
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
            <div className="flex items-center justify-between">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">ID: {appointment.id}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Trạng thái: {appointment.status}</p>
                </div>
                <Link className="px-4 mx-4 py-2 bg-blue-400 rounded-lg overflow-hidden" href={`/prescription-doctor?patientId=${appointment.patientId}`}>Kê thuốc</Link>
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">ID Bệnh nhân</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{appointment.patientId}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Ngày hẹn</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{appointment.appointmentDate}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">ID Bác sĩ</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{appointment.doctorId}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Nội dung</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{appointment.content}</dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Ngày tạo</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{appointment.dateCreated}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Địa điểm</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            {appointment.location.address}, Tầng: {appointment.location.floor}, Phòng: {appointment.location.roomNumber}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
};

const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState<AppointmentWithId[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const creds = getCredentials();
        if (!creds || creds.role !== 'DOCTOR') {
            window.location.href = '/';
            return;
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointment/doctor/${creds.uid}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${creds.idToken}`
            },
        }).then(async res => {
            if (res.ok) {
                setAppointments(await res.json());
            } else {
                setError(await res.text());
            }
            setLoading(false);
        }).catch((error) => {
            setError('An error occurred: ' + error);
            setLoading(false);
        })

    }, []);

    if (loading) {
        return <div className="text-center mt-12">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-12 text-red-600">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Danh sách cuộc hẹn</h2>
                {appointments.length === 0 ? (
                    <div className="text-center text-gray-600">No pending appointments</div>
                ) : (
                    appointments.map((appointment) => (
                        <Appointment key={appointment.id} appointmentWithId={appointment} />
                    ))
                )}
            </div>
        </div>
    );
};

export default AppointmentsPage;
