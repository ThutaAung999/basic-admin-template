export type Address = {
  sr: {
    p_code: string;
    name: string;
  };
  township: {
    p_code: string;
    name: string;
  };
};

export type User = {
  township: string;
  region: string;
  patient_type: string;
  address: Address;
  is_app_user: boolean;
  gender: "male" | "female";
  dob: string;
  _id: string;
  phone_number: string;
  status: "profile_completed" | "other_status";
  createdAt: string;
  updatedAt: string;
  __v: number;
  name: string;
  registeredAt: string;
  registeredFrom: string;
  user_id: string;
  app_version: string;
  os_platform: string;
  fcm_token: string;
  age: string;
  id: string;
};

export type GetUser = {
  skip?: number;
  limit?: number;
  search?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
};
