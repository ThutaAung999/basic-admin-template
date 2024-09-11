import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { Purchase, GetChildSales } from "../index";

export const getChildSales = async (queries?: GetChildSales) => {
  return api
    .get<{
      data: Purchase[];
      count: number;
    }>("/sales", { params: queries })
    .then((res) => res.data);
};

export const useGetChildSales = (queries?: GetChildSales) => {
  return useQuery({
    queryFn: () => getChildSales(queries),
    queryKey: ["childsales", queries],
  });
};
