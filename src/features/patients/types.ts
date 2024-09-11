export type Address = {
  _id: string;
  p_code: string;
  name: string;
  type: string;
};

export type GetAddress = {
  skip?: number;
  limit?: number;
  search?: string;
  type?: string;
};

export type GetDiagnosis = {
  skip?: number;
  limit?: number;
  type?: string;
  search?: string;
};

export type Diagnosis = {
  _id: string;
  name: string;
  type?: string;
};

//--------------------------shared types----------------------------------------------------

//--------------------------Types for PatientLists----------------------------------------------------
export type Weight = {
  unit: string;
  value: number;
};

export type AppUser = {
  _id: string;
  is_app_user: boolean;
  gender: string;
  dob: string;
  phone_number: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  address: UserAddress;
  name: string;
  registeredAt: string;
  registeredFrom: string;
  user_id: string;
  fcm_token: string;
  app_version: string;
  os_platform: string;
};

export type GetPatientsList = {
  skip?: number;
  limit?: number;
  search?: string;
  last_customer_type?: string;
  patient_type?: string;
  start?: string;
  end?: string;
  filter_type?: string;
};

export type Tab = {
  label: string;
  value: string;
};

//================================================================================================

//---------------------types-for-appMemberRequest-----------------------------------------------------------------------------------------------

type Plan = {
  title: string;
  duration: number;
  price: number;
};

export type Patient = {
  _id: string;
  address: Address;
  allergies: string[];
  contact_numbers: string[];
  use_nw_hn: boolean;
  is_app_user: boolean;
  symptoms: string[];
  name: string;
  gender: string;
  past_diagnosis: string;
  diagnosis: string;
  dob: string;
  weight: Weight;
  app_user: AppUser;
  caretaker: string;
  hn: number;
  imageUrls: string[];
  createdAt: string;
  updatedAt: string;
  expiration_date: string;
  last_customer_type: string;
  last_purchased_date: string;
  __v: number;
  membership_status: string;
  patient_number: number;
};

export type PatientSubscription = {
  _id: string;
  status: string;
  plan: Plan;
  createdAt: string;
  updatedAt: string;
  expiration_date: string;
  purchase_date: string;
  patient: Patient;
  patient_type: string;
  call_status: string;
  remark: string;
  package_status: string;
};

export interface UpdateResponse {
  success: boolean;
  message?: string;
}

export interface UpdateData {
  call_status?: string;
  remark?: string;
}

export type GetPackageSubscriptions = {
  skip?: number;
  limit?: number;
  search?: string;
  last_customer_type?: string;
  patient_type?: string;
  start?: string;
  end?: string;
  status?: string;
  member_type?: string;
};

//================================================================================================
export type Sales = {
  amount: string;
  customer: string;
  customer_type: string;
  duration: number;
  effective_date: string;
  expiration_date: string;
  intersecting_duration: number;
  is_extension: boolean;
  payment_provider: string;
  purchase_date: string;
  remark: string;
  _id: string; //added
};
export type UserAddress = {
  sr: { name: string; p_code: string };
  township: { name: string; p_code: string };
};

export type Images = {
  id: string;
  imageUrl: string;
}[];

export type Measurement = { value: number; unit: string };

export type Child = {
  address: UserAddress;
  allergies: string[];
  anthropometry_date_for_height?: string;
  anthropometry_date_for_weight?: string;
  app_user?: AppUser;
  caretaker: string;
  consultant?: string;
  contact_numbers: string[];
  dob: string;
  expiration_date?: string;
  g6pd?: boolean;
  gender: string;
  height?: Measurement;
  hn: number;
  id: string;
  imageUrls: {
    id: string;
    imageUrl: string;
  }[];
  is_app_user?: boolean;
  last_customer_type?: string;
  last_purchased_date?: string;
  membership_status: string;
  name: string;
  past_diagnosis?: string;
  past_history?: string;
  symptoms?: string[];
  use_nw_hn: boolean;
  weight?: Measurement;
  _id: string;
};

export type Mother = {
  address: UserAddress;
  allergy: string;
  anthropometry_date_for_height: string;
  anthropometry_date_for_weight: string;
  app_user: AppUser;
  caretaker: string;
  caretaker_contact_number: string;
  consultant: string;
  contact_numbers: string[];
  contraception_history: string;
  diagnosis: string;
  dob: string;
  drugs: string;
  due_date: Date | null;
  expiration_date: string;
  family_personal_condition: string;
  gravida: number;
  has_delivered_baby: boolean;
  height: Measurement;
  imageUrls: Images;
  last_customer_type: string;
  last_purchased_date: string;
  lmp_date: Date;
  medical_history: string;
  membership_status: string;
  menstrual_description: string;
  name: string;
  parity: number;
  patient_number: string;
  pregnancy_description: string;
  remark: string;
  weight: Measurement;
  _id: string;
};
