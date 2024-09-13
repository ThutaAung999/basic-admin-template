import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { Address, GetAddress } from "../types";

export const getAddress = async (queries?: GetAddress) => {
  return api
    .get<{ data: Address[]; count: number }>("/p_codes", { params: queries })
    .then((res) => res.data);
};

export const useGetAddress = (queries?: GetAddress) => {
  return useQuery({
    queryKey: ["address", queries],
    queryFn: () => getAddress(queries),
  });
};
