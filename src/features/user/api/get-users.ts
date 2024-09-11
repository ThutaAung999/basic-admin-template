import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { GetUsers, Users } from "../type";

export const getUsers = async (queries?: GetUsers) => {
  return api
    .get<{ data: Users[]; count: number }>("/users", { params: queries })
    .then((res) => res.data);
};

export const useGetUsers = (queries?: GetUsers) => {
  return useQuery({
    queryKey: ["users", queries],
    queryFn: () => getUsers(queries),
  });
};
