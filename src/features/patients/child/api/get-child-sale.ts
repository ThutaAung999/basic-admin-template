import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { Sales } from "../../types";

export const getChildSalesById = async ({ id }: { id: string | undefined }) => {
  return api
    .get<{
      data: Sales[];
      count: number;
    }>(`/patients/${id}/sales`)
    .then((res) => res.data);
};

export const useGetChildSalesById = (id: { id: string | undefined }) => {
  return useQuery({
    queryKey: ["childSalesById", id],
    queryFn: () => getChildSalesById(id),
  });
};
