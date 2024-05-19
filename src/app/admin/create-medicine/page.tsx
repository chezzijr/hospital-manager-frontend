"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { getCredentials } from "@/lib/creds";
import { Medicine } from "@/interface";
import CalendarForm from "@/components/CanlendarForm";
import { Icons } from "@root/public/assets/Images";
import { NEXT_PUBLIC_API_URL } from "@/ultils/contranst";
import { error } from "console";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CreateNewMedicine = () => {
  const [newMedicine, setNewMedicine] = useState<Medicine>({
    medicineName: "",
    barCode: "",
    description: "",
    manufacturer: "",
    price: 0,
    expiryDate: null,
    activeIngredients: "",
    dosage: "",
    medicineType: "",
    inventoryStatus: 0,
  });
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [date, setDate] = useState<Value>(new Date());

  const router = useRouter();

  const handleAddNewMedicine = () => {
    const creds = getCredentials();
    if (!creds) {
      window.location.href = "/login";
      return;
    }
    const expiryDate = Array.isArray(date) ? date[0] : date;

    setNewMedicine({
      ...newMedicine,
      expiryDate: expiryDate,
    });

    const token = creds.idToken;

    axios
      .post(
        `${NEXT_PUBLIC_API_URL}/medicine/create`,
        {
          medicineName: newMedicine.medicineName,
          barCode: newMedicine.barCode,
          description: newMedicine.description,
          manufacturer: newMedicine.manufacturer,
          price: newMedicine.price,
          expiryDate: expiryDate,
          activeIngredients: newMedicine.activeIngredients,
          dosage: newMedicine.dosage,
          medicineType: newMedicine.medicineType,
          inventoryStatus: newMedicine.inventoryStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
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
          Thêm thuốc mới
        </h1>
        <div className="flex relative items-center justify-center mx-12 bg-white rounded-lg mt-6">
          <input
            value={newMedicine.medicineName ? newMedicine.medicineName : ""}
            onChange={(e) => {
              setNewMedicine({
                ...newMedicine,
                medicineName: e.target.value,
              });
            }}
            placeholder="Thêm tên thuốc"
            className="w-5/6 h-8 rounded-lg border border-white focus:border-transparent focus:outline-none"
          />
        </div>

        <div className="flex relative items-center justify-center mx-12 bg-white rounded-lg mt-6">
          <input
            value={newMedicine.barCode ? newMedicine.barCode : ""}
            onChange={(e) => {
              setNewMedicine({
                ...newMedicine,
                barCode: e.target.value,
              });
            }}
            placeholder="Thêm mã thuốc"
            className="w-5/6 h-8 rounded-lg border border-white focus:border-transparent focus:outline-none"
          />
        </div>

        <div className="flex relative items-center justify-center mx-12 bg-white rounded-lg mt-6">
          <input
            value={newMedicine.description ? newMedicine.description : ""}
            onChange={(e) => {
              setNewMedicine({
                ...newMedicine,
                description: e.target.value,
              });
            }}
            placeholder="Thêm mô tả"
            className="w-5/6 h-8 rounded-lg border border-white focus:border-transparent focus:outline-none"
          />
        </div>

        <div className="flex relative items-center justify-center mx-12 bg-white rounded-lg mt-6">
          <input
            value={newMedicine.manufacturer ? newMedicine.manufacturer : ""}
            onChange={(e) => {
              setNewMedicine({
                ...newMedicine,
                manufacturer: e.target.value,
              });
            }}
            placeholder="Thêm đơn vị sản xuất"
            className="w-5/6 h-8 rounded-lg border border-white focus:border-transparent focus:outline-none"
          />
        </div>

        <div className="flex relative items-center justify-center mx-12 bg-white rounded-lg mt-6">
          <input
            value={newMedicine.price != 0 ? newMedicine.price : ""}
            onChange={(e) => {
              setNewMedicine({
                ...newMedicine,
                price: parseInt(e.target.value),
              });
            }}
            placeholder="Thêm giá tiền"
            className="w-5/6 h-8 rounded-lg border border-white focus:border-transparent focus:outline-none"
          />
        </div>

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
            value={
              newMedicine.activeIngredients ? newMedicine.activeIngredients : ""
            }
            onChange={(e) => {
              setNewMedicine({
                ...newMedicine,
                activeIngredients: e.target.value,
              });
            }}
            placeholder="Thêm thành phần thuốc"
            className="w-5/6 h-8 rounded-lg border border-white focus:border-transparent focus:outline-none"
          />
        </div>

        <div className="flex relative items-center justify-center mx-12 bg-white rounded-lg mt-6">
          <input
            value={newMedicine.dosage ? newMedicine.dosage : ""}
            onChange={(e) => {
              setNewMedicine({
                ...newMedicine,
                dosage: e.target.value,
              });
            }}
            placeholder="Liều lượng sử dụng"
            className="w-5/6 h-8 rounded-lg border border-white focus:border-transparent focus:outline-none"
          />
        </div>

        <div className="flex relative items-center justify-center mx-12 bg-white rounded-lg mt-6">
          <input
            value={newMedicine.medicineType ? newMedicine.medicineType : ""}
            onChange={(e) => {
              setNewMedicine({
                ...newMedicine,
                medicineType: e.target.value,
              });
            }}
            placeholder="Loại thuốc"
            className="w-5/6 h-8 rounded-lg border border-white focus:border-transparent focus:outline-none"
          />
        </div>

        <div className="flex relative items-center justify-center mx-12 bg-white rounded-lg mt-6">
          <input
            value={
              newMedicine.inventoryStatus ? newMedicine.inventoryStatus : ""
            }
            onChange={(e) => {
              setNewMedicine({
                ...newMedicine,
                inventoryStatus: parseInt(e.target.value),
              });
            }}
            placeholder="Số lượng hàng còn lại"
            className="w-5/6 h-8 rounded-lg border border-white focus:border-transparent focus:outline-none"
          />
        </div>

        <div className="mx-12 flex items-center justify-between mb-12 mt-12">
          <button
            className="w-32 h-10 bg-gray-500 hover:bg-gray-600 text-lg font-medium rounded-xl"
            onClick={() => {
              router.push("/admin/medicine");
            }}
          >
            Hủy
          </button>
          <button
            className="w-32 h-10 bg-blue-500 hover:bg-blue-600 text-lg font-medium rounded-xl text-white"
            onClick={() => {
              handleAddNewMedicine();
                setTimeout(() => router.push("/admin/medicine"), 2000);
            }}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewMedicine;
