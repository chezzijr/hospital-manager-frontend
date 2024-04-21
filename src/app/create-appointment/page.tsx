"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Images, Icons } from "@/../public/assets/Images";
import CalendarForm from "@/components/CanlendarForm";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface CalendarFormProps {
  date: Value;
  setDate: React.Dispatch<React.SetStateAction<Value>>;
}

const CreateAppointment = () => {
  const [date, setDate] = useState<Value>(new Date());

  return (
    <div className="mx-20 mt-12 flex items-center justify-center">
      <div className="w-2/5 flex-row items-center justify-center rounded-lg border border-gray-700 bg-gray-100">
        <h1 className="text-2xl font-medium flex justify-center mt-4">
          Tạo lịch khám
        </h1>
        <div className="flex relative items-center justify-center mx-12 bg-white rounded-lg mt-6">
          <input
            value=""
            placeholder="Chọn ngày tháng năm"
            className="w-5/6 h-8 rounded-lg border border-white focus:border-transparent focus:outline-none"
          />
          <button className="">
            <Image
              alt="Calendar"
              src={Icons.calendar}
              width={28}
              height={28}
              className=""
            />
          </button>
          <div className="absolute">
            {/* <CalendarForm date={date} setDate={setDate}/> */}
          </div>
        </div>
        <div className="mx-12 h-20 bg-white rounded-lg mt-6">
          <input
            value=""
            placeholder="Tình trạng bệnh tình"
            className="w-5/6 rounded-lg border border-white focus:border-transparent focus:outline-none px-6 mt-1"
          />
        </div>
        <div className="mx-12 bg-white rounded-lg mt-6">
          <input
            value=""
            placeholder="Chọn bác sĩ"
            className="w-5/6 h-8 rounded-lg border border-white focus:border-transparent focus:outline-none px-6 mt-1"
          />
        </div>

        <div className="mx-12 flex items-center justify-between mb-12 mt-12">
          <button className="w-32 h-10 bg-gray-500 hover:bg-gray-600 text-lg font-medium rounded-xl">Hủy</button>
          <button className="w-32 h-10 bg-blue-500 hover:bg-blue-600 text-lg font-medium rounded-xl text-white">Xác nhận</button>
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;
