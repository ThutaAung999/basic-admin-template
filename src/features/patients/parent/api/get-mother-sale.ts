import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { Sales } from "../../types";

export const getMotherSaleById = async ({ id }: { id: string | undefined }) => {
  return api
    .get<{
      data: Sales[];
      count: number;
    }>(`/mothers/patients/${id}/sales`)
    .then((res) => res.data);
};

export const useGetMotherSaleById = (id: { id: string | undefined }) => {
  return useQuery({
    queryKey: ["motherSalesById", id],
    queryFn: () => getMotherSaleById(id),
  });
};
