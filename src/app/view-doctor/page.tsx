"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

import { DoctorWithId } from "@/interface";
import { Images, Icons } from "@/../public/assets/Images";

const ViewDoctorInfo = () => {
  const [doctors, setDoctors] = useState<DoctorWithId[]>([]);
  const [searchInfo, setSearchInfo] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/doctor`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="mx-20 mt-12">
      <div className="flex flex-row justify-center">
        <div className="w-2/5 flex items-center justify-between border border-gray-400 rounded-3xl py-1 px-4">
          <input
            placeholder="Tìm bác sĩ"
            value={searchInfo}
            onChange={(e) => setSearchInfo(e.target.value)}
            className="w-2/3 h-8 outline-none"
          />
          <Image
            alt="Search icon"
            src={Icons.search}
            width={32}
            height={32}
            className="hover:cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center mt-12">
        {doctors &&
          doctors.map((doctor) => (
            <div key={doctor.id} className="w-60 bg-gray-100 rounded-xl">
              <Image
                alt="Doctor image"
                src={Images.doctor}
                className="w-full rounded-xl"
              />
              <div className="mt-2 ml-2">
                <div className="flex items-center justify-start">
                  <p className="text-lg font-medium pr-2">Bác sĩ</p>
                  <p className="text-base font-normal">{doctor.doctor.name}</p>
                </div>
                <div className="flex items-center justify-start">
                  <p className="text-lg font-medium pr-2">Chuyên khoa</p>
                  <p className="text-base font-normal">{doctor.doctor.specialization}</p>
                </div>
                <div className="flex items-center justify-start">
                  <p className="text-lg font-medium pr-2">Số năm kinh nghiệm</p>
                  <p className="text-base font-normal">{doctor.doctor.yearOfExperience}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ViewDoctorInfo;
