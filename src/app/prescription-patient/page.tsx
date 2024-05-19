"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "@/ultils/contranst";
import { getCredentials } from "@/lib/creds";

import { PrescriptionWithId, Medicine } from "@/interface";

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState<PrescriptionWithId[]>([]);
  const [isNoPreScription, setIsNoPrescription] = useState(false);

  useEffect(() => {
    const creds = getCredentials();
    if (!creds) {
      window.location.href = "/login";
      return;
    }
    const token = creds.idToken;
    const uid = creds.uid;
    axios
      .get(`${NEXT_PUBLIC_API_URL}/prescription/patient/${uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (typeof response.data === "string") {
          setIsNoPrescription(true);
        } else {
          setPrescriptions(response.data);
        }
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="mx-20 mt-12">
      {isNoPreScription ? (
        <div>Patient dont have prescription</div>
      ) : (
        <>
          <div className="flex items-center justify-start">
            {prescriptions &&
              prescriptions.map((prescription) => (
                <Link
                  href={`/prescription-patient/${prescription.id}`}
                  key={prescription.id}
                  className="mx-4 my-2"
                >
                  <div className="flex-row items-center justify-start bg-blue-400 hover:bg-blue-500 hover:cursor-pointer py-4 px-6 rounded-lg">
                    <div className="flex items-center justify-start">
                      <p className="text-lg font-medium pr-2">Ngày khám:</p>
                      <p className="text-lg font-normal pr-2">
                        {prescription.prescription.dateCreated
                          .toString()
                          .slice(0, 10)}
                      </p>
                    </div>
                    <div className="flex items-center justify-start">
                      <p className="text-lg font-medium pr-2">
                        Ngày hẹn quay lại:
                      </p>
                      <p className="text-lg font-normal pr-2">
                        {prescription.prescription.expiryDate
                          .toString()
                          .slice(0, 10)}
                      </p>
                    </div>
                    <div className="flex items-center justify-start">
                      <p className="text-lg font-medium pr-2">Tổng tiền:</p>
                      <p className="text-lg font-normal pr-2">
                        {prescription.prescription.price}
                      </p>
                    </div>
                    <div className="flex items-center justify-start">
                      <p className="text-lg font-medium pr-2">Lưu ý:</p>
                      <p className="text-lg font-normal pr-2">
                        {prescription.prescription.note}
                      </p>
                    </div>
                    <div className="flex items-center justify-start">
                      <p className="text-lg font-medium pr-2">Chuẩn đoán:</p>
                      <p className="text-lg font-normal pr-2">
                        {prescription.prescription.diagnosis}
                      </p>
                    </div>
                    <div className="flex-row items-center justify-start">
                      <p className="text-lg font-medium pr-2">Thuốc đã mua:</p>
                      {prescription.prescription.medicineArrayList.map(
                        (medicine, index) => (
                          <div
                            key={index}
                            className="flex-row items-center justify-start ml-32 px-2 py-1 bg-slate-200 mb-4 rounded-lg hover:bg-slate-300"
                          >
                            <div className="flex items-center justify-start">
                              <p className="text-base font-medium pr-2">
                                Tên thuốc:
                              </p>
                              <p className="text-base font-normal pr-2">
                                {medicine.medicineName}
                              </p>
                            </div>
                            <div className="flex items-center justify-start">
                              <p className="text-base font-medium pr-2">
                                Mô tả:
                              </p>
                              <p className="text-base font-normal pr-2">
                                {medicine.description}
                              </p>
                            </div>
                            <div className="flex items-center justify-start">
                              <p className="text-base font-medium pr-2">
                                Loại thuốc:
                              </p>
                              <p className="text-base font-normal pr-2">
                                {medicine.medicineType}
                              </p>
                            </div>
                            <div className="flex items-center justify-start">
                              <p className="text-base font-medium pr-2">
                                Giá tiền:
                              </p>
                              <p className="text-base font-normal pr-2">
                                {medicine.price}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Prescription;
