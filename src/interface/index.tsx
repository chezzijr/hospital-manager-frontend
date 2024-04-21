interface Doctor {
  name: string;
  specialization: string;
  qualification: string;
  yearOfExperience: number;
  phoneNumber: string;
  workingHours: number;
  gender: string;
  dateOfBirth: string;
}

interface Feedback {
  id: string;
  patientId: string;
  doctorId: string;
  content: string;
  ratingStar: number;
  dateCreated: string;
}

export interface DoctorWithId {
  id: string;
  doctor: Doctor;
}

export interface FeedbackWithId {
  id: string;
  feedback: Feedback;
}
