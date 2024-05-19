"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { NEXT_PUBLIC_API_URL } from "@/ultils/contranst";
import { getCredentials } from "@/lib/creds";

import { Images, Icons } from "@/../public/assets/Images";
import CalendarForm from "@/components/CanlendarForm";
import { DoctorWithId, Doctor, Location } from "@/interface";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CreateAppointment = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [isShowDoctors, setIsShowDoctors] = useState(false);
  const [content, setContent] = useState("");
  const [doctors, setDoctors] = useState<DoctorWithId[]>([]);
  const [doctor, setDoctor] = useState<Doctor>();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    axios
      .get(`${NEXT_PUBLIC_API_URL}/doctor`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleCreateNewAppointment = () => {
    const creds = getCredentials();
    if (!creds) {
      window.location.href = "/login";
      return;
    }
    const id = uuidv4();
    const patientId: string | null = localStorage?.getItem("uid");
    const doctorId = doctor?.id;
    const appointmentDate = date ? new Date(date.toString()) : new Date();
    const appointmentContent = content;
    const status = "WATING";
    const location: Location = {
      address: "Di an, Binh Duong",
      floor: "3",
      roomNumber: "307",
    };
    const locationToString = JSON.stringify(location);
    const dateCreated = new Date();

    const token = creds.idToken;

    axios
      .post(
        `${NEXT_PUBLIC_API_URL}/appointment/create`,
        {
          patientId: patientId,
          doctorId: doctorId,
          id: id,
          appointmentDate: appointmentDate,
          content: content,
          status: status,
          location: location,
          dateCreated: dateCreated,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        alert(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="mx-20 mt-12 flex items-center justify-center">
      <div className="w-2/5 flex-row items-center justify-center rounded-lg border border-gray-700 bg-gray-100">
        <h1 className="text-2xl font-medium flex justify-center mt-4">
          Tạo lịch khám
        </h1>
        <div className="flex relative items-center justify-center mx-12 bg-white rounded-lg mt-6">
          <input
            value={date ? date.toString().slice(0, 15) : ""}
            readOnly
            placeholder="Chọn ngày tháng năm"
            className="w-5/6 h-8 rounded-lg border border-white focus:border-transparent focus:outline-none"
          />
          <div className="relative">
            <button
              className=""
              onClick={() => setIsShowCalendar(!isShowCalendar)}
            >
              <Image
                alt="Calendar"
                src={Icons.calendar}
                width={28}
                height={28}
                className=""
              />
            </button>
            {isShowCalendar ? (
              <div className="absolute w-60 bg-slate-300 flex items-center justify-center rounded-xl">
                <CalendarForm date={date} setDate={setDate} />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className="mx-12 h-20 bg-white rounded-lg mt-6">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tình trạng bệnh tình"
            className="w-5/6 rounded-lg border border-white focus:border-transparent focus:outline-none px-6 mt-1"
          />
        </div>
        <div className="relative mx-12 bg-white rounded-lg mt-6 flex items-center justify-between px-4">
          <input
            value={doctor ? doctor.name : ""}
            readOnly
            placeholder="Chọn bác sĩ"
            className="w-5/6 h-8 rounded-lg border border-white focus:border-transparent focus:outline-none px-2 mt-1"
          />
          <Image
            alt="Down arrow"
            src={Icons.downArrow}
            width={24}
            height={24}
            className="hover:cursor-pointer"
            onClick={() => {
              setIsShowDoctors(!isShowDoctors);
            }}
          />
          {isShowDoctors ? (
            <div className="absolute top-12 left-0 w-full">
              {doctors &&
                doctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    className="w-full rounded-lg mb-2 h-12 bg-slate-200 flex items-center justify-start px-4 hover:cursor-pointer"
                    onClick={() => {
                      setDoctor(doctor.doctor);
                      setIsShowDoctors(false);
                    }}
                  >
                    <p className="text-base font-medium pr-2">Bác sĩ</p>
                    <p className="text-base font-normal pr-2">
                      {doctor.doctor.name}
                    </p>
                    <p className="text-base font-medium pr-2">Chuyên khoa</p>
                    <p className="text-base font-normal pr-2">
                      {doctor.doctor.specialization}
                    </p>
                  </button>
                ))}
            </div>
          ) : (
            <div className="absolute"> </div>
          )}
        </div>

        <div className="mx-12 flex items-center justify-between mb-12 mt-12">
          <button
            className="w-32 h-10 bg-gray-500 hover:bg-gray-600 text-lg font-medium rounded-xl"
            onClick={() => {
              router.push("/appointment");
            }}
          >
            Hủy
          </button>
          <button
            className="w-32 h-10 bg-blue-500 hover:bg-blue-600 text-lg font-medium rounded-xl text-white"
            onClick={() => {
              handleCreateNewAppointment();
              setTimeout(() => router.push("/appointment"), 2000);
            }}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;
