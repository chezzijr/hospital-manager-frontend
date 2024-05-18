import axios from "axios";
import Image from "next/image";

import { Images, Icons } from "@/../public/assets/Images";
import { DoctorWithId } from "@/interface";
import { NEXT_PUBLIC_API_URL } from "@/ultils/contranst";

export async function generateStaticParams() {
  const response = await axios.get(`${NEXT_PUBLIC_API_URL}/doctor`);
  const doctors = response.data;

  return doctors.map((doctor: DoctorWithId) => ({
    id: doctor.id.toString(),
  }));
}

async function getDoctorById(id: string) {
  const response = await axios.get(`${NEXT_PUBLIC_API_URL}/doctor/${id}`);
  console.log(response.data);
  if (response.data == "Cannot find doctor") {
    return null;
  }
  const doctor = response.data;
  return doctor;
}

export default async function DoctorByID({
  params,
}: {
  params: { id: string };
}) {
  const doctor: DoctorWithId = await getDoctorById(params.id);
  return (
    <>
      {doctor ? (
        <div className="mt-12 items-center justify-center">
          <div className="text-2xl font-semibold underline mx-72 mb-8">
            THÔNG TIN BÁC SĨ
          </div>
          <div className="flex items-center justify-center">
            <div className="w-3/5 flex items-start justify-start px-8 py-10 rounded-xl bg-slate-200">
              <div className="w-3/5 mr-10">
                <Image
                  alt="Doctor Image"
                  src={Images.doctor}
                  className="w-full rounded-md"
                />
              </div>
              <div className="w-2/5 flex-row items-start justify-start">
                <div className="flex justify-start items-start mt-12">
                  <p className="text-xl font-medium underline pr-2">Họ tên:</p>
                  <p className="text-xl font-normal pr-2">
                    {doctor.doctor.name}
                  </p>
                </div>
                <div className="flex justify-start items-start mt-4">
                  <p className="text-xl font-medium underline pr-2">
                    Giới tính:
                  </p>
                  <p className="text-xl font-normal pr-2">
                    {doctor.doctor.gender == "male" ? "Nam" : "Nữ"}
                  </p>
                </div>
                <div className="flex justify-start items-start mt-4">
                  <p className="text-xl font-medium underline pr-2">
                    Bằng cấp:
                  </p>
                  <p className="text-xl font-normal pr-2">
                    {doctor.doctor.qualification}
                  </p>
                </div>
                <div className="flex justify-start items-start mt-4">
                  <p className="text-xl font-medium underline pr-2">
                    Chuyên khoa:
                  </p>
                  <p className="text-xl font-normal pr-2">
                    {doctor.doctor.specialization}
                  </p>
                </div>
                <div className="flex justify-start items-start mt-4">
                  <p className="text-xl font-medium underline pr-2">
                    Số điện thoại:
                  </p>
                  <p className="text-xl font-normal pr-2">
                    {doctor.doctor.phoneNumber}
                  </p>
                </div>
                <div className="flex justify-start items-start mt-4">
                  <p className="text-xl font-medium underline pr-2">
                    Số năm kinh nghiệm:
                  </p>
                  <p className="text-xl font-normal pr-2">
                    {doctor.doctor.yearOfExperience}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Cannot find doctor</div>
      )}
    </>
  );
}
