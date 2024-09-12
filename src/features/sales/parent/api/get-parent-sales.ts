import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { Purchase, GetParentSales } from "..";

export const getParentSales = async (queries?: GetParentSales) => {
  return api
    .get<{
      data: Purchase[];
      count: number;
    }>("/mothers/sales", { params: queries })
    .then((res) => res.data);
};

export const useGetParentSales = (queries?: GetParentSales) => {
  return useQuery({
    queryFn: () => getParentSales(queries),
    queryKey: ["parentsales", queries],
  });
};
