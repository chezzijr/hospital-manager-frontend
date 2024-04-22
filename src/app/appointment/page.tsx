"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

interface Location {
  address: string;
  floor: string;
  roomNumber: string;
}

interface Appointment {
  id: string;
  patientId: string;
  appointmentDate: string;
  doctorId: string;
  content: string;
  status: string;
  location: Location;
  dateCreated: string;
}

interface AppointmentWithId {
  id: string;
  appointment: Appointment;
}

const Appointment = () => {
  const [appointments, setAppointments] = useState<AppointmentWithId[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("uid");
    const token = localStorage.getItem("idToken");

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/appointment/patient/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="mx-20">
      <div className="mt-12 flex items-center justify-end">
        <div className="opacity-0"></div>
        <Link
          href="/create-appointment"
          className="flex items-center justify-center w-36 h-12 rounded-lg bg-blue-600 text-lg font-medium text-white hover:cursor-pointer hover:bg-blue-700"
        >
          Tạo lịch khám
        </Link>
      </div>
      <div className="">
        <div className="text-lg font-medium underline">
          Danh sách lịch khám đã đặt
        </div>
        <div className="flex flex-wrap items-center">
          {appointments &&
            appointments.length != 0 &&
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="w-80 h-36 bg-blue-400 rounded-lg mx-8 my-4 px-4 py-2 hover:cursor-pointer hover:bg-blue-500"
              >
                <div className="flex items-center justify-start">
                  <p className="font-semibold pr-1">Ngày khám: </p>
                  <p className="">
                    {appointment.appointment.appointmentDate.slice(0, 10)}
                  </p>
                </div>
                <div className="flex items-center justify-start">
                  <p className="font-semibold pr-1">Ngày đăng kí:</p>
                  <p className="">
                    {appointment.appointment.dateCreated?.slice(0, 10)}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-start">
                  <p className="font-semibold pr-1">Địa điểm: </p>
                  <p className="">
                    Chi nhánh {appointment.appointment.location.address} tầng{" "}
                    {appointment.appointment.location.floor} phòng{" "}
                    {appointment.appointment.location.roomNumber}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
