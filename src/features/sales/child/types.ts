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

export type Customer = {
  address: Address;
  contact_numbers: string[];
  _id: string;
  name: string;
  caretaker: string;
  hn: number;
  membership_status: string;
  id: string;
};

export type Purchase = {
  intersecting_duration: number;
  _id: string;
  purchase_date: string;
  customer_type: string;
  amount: number;
  duration: number;
  payment_provider: string;
  remark: string;
  customer: Customer;
  expiration_date: string;
  effective_date: string;
  is_extension: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type GetChildSales = {
  skip?: number;
  limit?: number;
  search?: string;
  membership?: string;
  start?: string;
  end?: string;
  filter_type?: string;
};

export const MEMBERSHIP_TYPES = ["All", "NEW", "EXTENSION"];
