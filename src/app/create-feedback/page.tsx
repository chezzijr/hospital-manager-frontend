"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { FeedbackWithId } from "@/interface";
import { RatingStar } from "@/components/RatingStar";

const CreateFeedBack = () => {
//   const [doctors, setDoctors] = useState<DoctorWithId[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackWithId[]>([]);

//   useEffect(() => {
//     const token = localStorage.getItem("idToken");
//     axios
//       .get(`${process.env.NEXT_PUBLIC_API_URL}/doctor`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((response) => {
//         setDoctors(response.data);
//       })
//       .catch((error) => console.log(error));
//   }, []);

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/feedback`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="mx-20 mt-12 flex items-center justify-center">
      <div className="w-2/5 flex-row items-center justify-center rounded-lg border border-gray-700 bg-gray-100">
        <h1 className="text-2xl font-medium flex justify-center mt-4">
          Feedback
        </h1>
        <div className="mx-12 bg-white rounded-lg mt-6">
          <input
            value=""
            placeholder="Chọn bác sĩ"
            className="w-5/6 h-8 rounded-lg border border-white focus:border-transparent focus:outline-none px-6"
          />
        </div>
        <div className="mx-12 h-20 bg-white rounded-lg mt-6">
          <input
            value=""
            placeholder="Nội dung"
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
        {/* <div className="flex items-center justify-between">
          <RatingStar />
        </div> */}

        <div className="mx-12 flex items-center justify-between mb-12 mt-12">
          <button className="w-32 h-10 bg-gray-500 hover:bg-gray-600 text-lg font-medium rounded-xl">Hủy</button>
          <button className="w-32 h-10 bg-blue-500 hover:bg-blue-600 text-lg font-medium rounded-xl text-white">Xác nhận</button>
        </div>
      </div>
    </div>
  );
};

export default CreateFeedBack;
