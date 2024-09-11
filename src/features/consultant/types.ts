export type Consultant = {
  _id: string;
  name: string;
};

export type GetConsultants = {
  skip?: number;
  limit?: number;
  search?: string;
};
