"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import { Images, Icons } from "@/../public/assets/Images";

import { FeedbackWithId } from "@/interface/index";
import { Star } from "@/components/RatingStar";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackWithId[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/feedback`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setFeedbacks(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="mx-20">
      <div className="flex items-center justify-between mt-12">
        <div className="w-1/5 opacity-0"></div>
        <Link
          href="/create-feedback"
          className="flex items-center justify-center w-36 h-12 rounded-lg bg-blue-600 text-lg font-medium text-white hover:cursor-pointer hover:bg-blue-700"
        >
          Tạo Feedback
        </Link>
      </div>
      <div className="flex flex-wrap items-center justify-between">
        {feedbacks &&
          feedbacks.map((feedback) => (
            <div key={feedback.id} className="w-80 border border-gray-500 rounded-xl flex items-start justify-start py-4 px-4">
              <Image
                alt="User avatar"
                src={Icons.avatar}
                width={60}
                height={60}
                className=""
              />
              <div className="ml-6">
                <div className="text-lg font-medium">
                  Đánh giá từ người dùng
                </div>
                <div className="text-base font-normal">
                  {feedback.feedback.content}
                </div>
                <div className="">
                  <Star rating={5} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Feedback;
