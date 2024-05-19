export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  qualification: string;
  yearOfExperience: number;
  phoneNumber: string;
  workingHours: number;
  gender: string;
  dateOfBirth: string;
}

export interface Feedback {
  id: string;
  patientId: string;
  content: string;
  ratingStar: number;
  dateCreated: string;
}

export interface Location {
  address: string;
  floor: string;
  roomNumber: string;
}

export interface Medicine {
  medicineName: string;
  barCode: string;
  description: string;
  manufacturer: string;
  price: number;
  expiryDate: Date | null;
  activeIngredients: string;
  dosage: string;
  medicineType: string;
  inventoryStatus: number;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  dateCreated: Date;
  expiryDate: Date;
  price: number;
  note: string;
  instructions: string;
  diagnosis: string;
  medicineArrayList: Medicine[];
}

export interface DoctorWithId {
  id: string;
  doctor: Doctor;
}

export interface FeedbackWithId {
  id: string;
  feedback: Feedback;
}

export interface PrescriptionWithId {
  id: string;
  prescription: Prescription;
}

export interface MedicineWithId {
  id: string;
  medicine: Medicine;
}