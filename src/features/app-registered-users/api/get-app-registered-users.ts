import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { User, GetUser } from "..";

export const getAppRegisteredUsers = async (queries?: GetUser) => {
  return api
    .get<{
      data: User[];
      count: number;
    }>("/app_users", { params: queries })
    .then((res) => res.data);
};
export const useGetAppRegisteredUsers = (queries?: GetUser) => {
  return useQuery({
    queryFn: () => getAppRegisteredUsers(queries),
    queryKey: ["registered-users", queries],
  });
};
