import { api } from "@/libs/axios";
import { Diagnosis, GetDiagnosis } from "../../types";
import { useQuery } from "@tanstack/react-query";

export const getMotherDiagnosis = async (queries: GetDiagnosis) => {
  return api
    .get<{
      data: Diagnosis[];
      count: number;
    }>("/mother_diagnoses", { params: queries })
    .then((res) => res.data);
};

export const useGetMotherDiagnosis = (queries: GetDiagnosis) => {
  return useQuery({
    queryKey: ["mother_diagnosis", queries],
    queryFn: () => getMotherDiagnosis(queries),
  });
};
