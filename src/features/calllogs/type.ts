type Diagnosis = {
  _id: string;
  name: string;
};

type Patient = {
  _id: string;
  name: string;
  hn: number;
  last_customer_type: string;
  membership_status: string;
  last_subscription: string | null;
};

type User = {
  _id: string;
  name: string;
};

type MetaData = {
  patient_type: string;
};

type FollowUp = {
  status: string;
  _id: string;
  follow_up_date: string;
  reason: string;
};

export type CallRecord = {
  _id: string;
  phone: string;
  call_start_time: string;
  call_end_time: string;
  diagnosis: Diagnosis;
  call_type: string;
  patient: Patient;
  initial_treatment: string;
  user: User;
  hopi: string;
  chief_complaint: string;
  meta_data: MetaData;
  is_medicine_required: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  // added
  follow_up?: FollowUp;
};

export type GetChildCallLog = {
  skip?: number;
  limit?: number;
  search?: string;
  patient_type?: string;
  start?: string;
  end?: string;
};
