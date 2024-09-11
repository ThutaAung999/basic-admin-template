import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { Consultant, GetConsultants } from "..";

export const getConsultants = async (queries?: GetConsultants) =>
  api
    .get<{
      consultants: Consultant[];
      count: number;
    }>("/consultants", { params: queries })
    .then((res) => res.data);

export const useGetConsultants = (queries?: GetConsultants) =>
  useQuery({
    queryFn: () => getConsultants(queries),
    queryKey: ["consultants", queries],
  });
