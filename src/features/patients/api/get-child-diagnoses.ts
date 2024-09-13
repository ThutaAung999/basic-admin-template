import { api } from "@/libs/axios";
import { Diagnosis, GetDiagnosis } from "../types";
import { useQuery } from "@tanstack/react-query";

export const getChildDiagnoses = async (queries: GetDiagnosis) => {
  return api
    .get<{
      data: Diagnosis[];
      count: number;
    }>("/child_diagnoses", { params: queries })
    .then((res) => res.data);
};

export const useGetChildDiagnoses = (queries: GetDiagnosis) => {
  return useQuery({
    queryKey: ["diagnoses", queries],
    queryFn: () => getChildDiagnoses(queries),
  });
};
