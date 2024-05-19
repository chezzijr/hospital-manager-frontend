"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

import { NEXT_PUBLIC_API_URL } from "@/ultils/contranst";
import { getCredentials } from "@/lib/creds";
import { MedicineWithId } from "@/interface";
import Link from "next/link";

const Medicines = () => {
  const [medicines, setMedicines] = useState<MedicineWithId[]>([]);
  useEffect(() => {
    const creds = getCredentials();
    if (!creds) {
      window.location.href = "/";
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

  return (
    <div>
      <div className="flex items-center justify-between mt-12 mx-8">
        <div className="opacity-0">!</div>
        <Link href="/admin/create-medicine" className="">
          <button className="w-32 h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg rounded-lg">
            Thêm thuốc
          </button>
        </Link>
      </div>
      {medicines && medicines.length ? (
        <div className="">
          {medicines.map((medicine) => (
            <div
              key={medicine.id}
              className="w-1/4 bg-blue-400 rounded-lg mx-8 my-4 px-4 py-2 hover:cursor-pointer hover:bg-blue-500"
            >
              <div className="flex items-center justify-start">
                <p className="font-semibold pr-1">Tên thuốc: </p>
                <p className="">{medicine.medicine.medicineName}</p>
              </div>
              <div className="flex items-center justify-start">
                <p className="font-semibold pr-1">Mã thuốc: </p>
                <p className="">{medicine.medicine.barCode}</p>
              </div>
              <div className="flex items-center justify-start">
                <p className="font-semibold pr-1">Mô tả: </p>
                <p className="">{medicine.medicine.description}</p>
              </div>
              <div className="flex items-center justify-start">
                <p className="font-semibold pr-1">Nhà sản xuất: </p>
                <p className="">{medicine.medicine.manufacturer}</p>
              </div>
              <div className="flex items-center justify-start">
                <p className="font-semibold pr-1">Giá: </p>
                <p className="">{medicine.medicine.price}</p>
              </div>
              <div className="flex items-center justify-start">
                <p className="font-semibold pr-1">Ngày sản xuất: </p>
                <p className="">{medicine.medicine.expiryDate?.toString().slice(0, 10)}</p>
              </div>
              <div className="flex items-center justify-start">
                <p className="font-semibold pr-1">Thành phần: </p>
                <p className="">{medicine.medicine.activeIngredients}</p>
              </div>
              <div className="flex items-center justify-start">
                <p className="font-semibold pr-1">Liều lượng: </p>
                <p className="">{medicine.medicine.dosage}</p>
              </div>
              <div className="flex items-center justify-start">
                <p className="font-semibold pr-1">Loại thuốc: </p>
                <p className="">{medicine.medicine.medicineType}</p>
              </div>
              <div className="flex items-center justify-start">
                <p className="font-semibold pr-1">Số lượng: </p>
                <p className="">{medicine.medicine.inventoryStatus}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 mx-8">Dont have medicines</div>
      )}
    </div>
  );
};

export default Medicines;
