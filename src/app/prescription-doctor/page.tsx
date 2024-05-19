"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import axios from "axios";
import { getCredentials } from "@/lib/creds";
import { Prescription, MedicineWithId } from "@/interface";
import { NEXT_PUBLIC_API_URL } from "@/ultils/contranst";
import CalendarForm from "@/components/CanlendarForm";
import { Icons } from "@root/public/assets/Images";
import { Suspense } from "react";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function PrescriptionInfo() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
          <PrescriptionDoctor />
      </Suspense>
  );
}

const PrescriptionDoctor = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [medicines, setMedicines] = useState<MedicineWithId[]>([]);
  const [isShowMedicine, setIsShowMedicine] = useState(false);
  const [prescription, setPrescription] = useState<Prescription>({
    id: "",
    patientId: "",
    doctorId: "",
    dateCreated: new Date(),
    expiryDate: new Date(),
    price: 0,
    note: "",
    instructions: "",
    diagnosis: "",
    medicineArrayList: [],
  });
  const [date, setDate] = useState<Value>(new Date());
  const [isShowCalendar, setIsShowCalendar] = useState(false);

  useEffect(() => {
    const creds = getCredentials();
    if (!creds) {
      window.location.href = "/login";
      return;
    }
    axios
      .get(`${NEXT_PUBLIC_API_URL}/medicine`)
      .then((response) => {
        if (response.status == 200) {
          setMedicines(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddNewPrescription = () => {
    const creds = getCredentials();
    if (!creds) {
      window.location.href = "/login";
      return;
    }
    const token = creds.idToken;
    axios
      .post(
        `${NEXT_PUBLIC_API_URL}/prescription/create`,
        {
          id: uuidv4(),
          doctorId: creds.uid,
          patientId: searchParams.get("patientId"),
          dateCreated: prescription.dateCreated,
          expiryDate: prescription.expiryDate,
          price: prescription.price,
          note: prescription.note,
          instructions: prescription.instructions,
          diagnosis: prescription.diagnosis,
          medicineArrayList: prescription.medicineArrayList,
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
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mx-16 mt-12 flex items-center justify-center">
      <div className="w-2/5 flex-row items-center justify-center rounded-lg border border-gray-700 bg-gray-100">
        <h1 className="text-2xl font-medium flex justify-center mt-4">
          Thông tin đơn thuốc
        </h1>
        <div className="flex relative items-center justify-center mx-12 bg-white rounded-lg mt-6">
          <input
            value={
              prescription.dateCreated
                ? prescription.dateCreated.toString().slice(0, 10)
                : ""
            }
            readOnly
            placeholder="Ngày khám"
            className="w-5/6 h-8 rounded-lg border border-white focus:border-transparent focus:outline-none"
          />
        </div>

        <div className="flex relative items-center justify-center mx-12 bg-white rounded-lg mt-6">
          <input
            value={date ? date.toString().slice(0, 15) : ""}
            readOnly
            placeholder="Ngày khám lại"
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
              <div className="absolute z-10 w-60 bg-slate-300 flex items-center justify-center rounded-xl">
                <CalendarForm date={date} setDate={setDate} />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <div className="flex relative items-center justify-center mx-12 bg-white rounded-lg mt-6">
          <input
            value={prescription.note ? prescription.note : ""}
            onChange={(e) => {
              setPrescription({
                ...prescription,
                note: e.target.value,
              });
            }}
            placeholder="Lưu ý cho bệnh nhân"
            className="w-5/6 h-8 rounded-lg border border-white focus:border-transparent focus:outline-none"
          />
        </div>

        <div className="flex relative items-center justify-center mx-12 bg-white rounded-lg mt-6">
          <input
            value={prescription.diagnosis ? prescription.diagnosis : ""}
            onChange={(e) => {
              setPrescription({
                ...prescription,
                diagnosis: e.target.value,
              });
            }}
            placeholder="Chuẩn đoán"
            className="w-5/6 h-8 rounded-lg border border-white focus:border-transparent focus:outline-none"
          />
        </div>

        <div className="flex relative items-center justify-center mx-12 bg-white rounded-lg mt-6">
          <input
            value={prescription.instructions ? prescription.instructions : ""}
            onChange={(e) => {
              setPrescription({
                ...prescription,
                instructions: e.target.value,
              });
            }}
            placeholder="Hướng dẫn"
            className="w-5/6 h-8 rounded-lg border border-white focus:border-transparent focus:outline-none"
          />
        </div>

        <div className="relative mx-12 bg-white rounded-lg mt-6 flex items-center justify-between px-4">
          <input
            value={
              prescription.medicineArrayList
                ? prescription.medicineArrayList
                    .map((med) => med.medicineName)
                    .join(", ")
                : ""
            }
            readOnly
            placeholder="Tên thuốc"
            className="w-5/6 h-12 rounded-lg border border-white focus:border-transparent focus:outline-none px-2 mt-1"
          />
          <Image
            alt="Down arrow"
            src={Icons.downArrow}
            width={24}
            height={24}
            className="hover:cursor-pointer"
            onClick={() => {
              setIsShowMedicine(!isShowMedicine);
            }}
          />
          {isShowMedicine ? (
            <div className="absolute top-12 left-0 w-full">
              {medicines &&
                medicines.map((medicine) => (
                  <button
                    key={medicine.id}
                    className="w-full rounded-lg mb-2 h-12 bg-slate-200 flex items-center justify-start px-4 hover:cursor-pointer"
                    onClick={() => {
                      setPrescription((prevPrescription) => {
                        const isMedicineInList =
                          prevPrescription.medicineArrayList.some(
                            (m) => m.barCode === medicine.medicine.barCode
                          );
                        if (!isMedicineInList) {
                          return {
                            ...prevPrescription,
                            medicineArrayList: [
                              ...prevPrescription.medicineArrayList,
                              medicine.medicine,
                            ],
                          };
                        }
                        return prevPrescription;
                      });
                    }}
                  >
                    <p className="text-base font-medium pr-2">
                      Thuốc {medicine.medicine.medicineName} Tác dụng{" "}
                      {medicine.medicine.description}
                    </p>
                  </button>
                ))}
            </div>
          ) : (
            <div className="absolute"> </div>
          )}
        </div>
        <div className="flex items-center justify-between mx-12 mt-6">
          <div className="opacity-0">!</div>
          <div className="flex items-center justify-start">
            <h1 className="text-normal font-medium pr-1">Giá tiền</h1>
            <h1 className="text-normal font-normal">
              {prescription.medicineArrayList.reduce(
                (total, medicine) => total + medicine.price,
                0
              )}{" "}
              VND
            </h1>
          </div>
        </div>

        <div className="mx-12 flex items-center justify-between mb-12 mt-12">
          <button
            className="w-32 h-10 bg-gray-500 hover:bg-gray-600 text-lg font-medium rounded-xl"
            onClick={() => {
              router.push("/");
            }}
          >
            Hủy
          </button>
          <button
            className="w-32 h-10 bg-blue-500 hover:bg-blue-600 text-lg font-medium rounded-xl text-white"
            onClick={() => {
              handleAddNewPrescription();
              setTimeout(() => router.push("/"), 2000);
            }}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

