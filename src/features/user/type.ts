export type Users = {
  _id: string;
  name: string;
  email: string;
  firebase_id: string;
};

export type GetUsers = {
  skip?: number;
  limit?: number;
  search?: number;
};
