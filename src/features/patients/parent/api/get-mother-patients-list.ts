import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { Patient, GetPatientsList } from "../..";

export const getMotherPatientsList = async (queries?: GetPatientsList) => {
  return api
    .get<{
      data: Patient[];
      count: number;
    }>("/mothers/patients", { params: queries })
    .then((res) => res.data);
};

export const useGetMotherPatientList = (queries?: GetPatientsList) => {
  return useQuery({
    queryFn: () => getMotherPatientsList(queries),
    queryKey: ["mother-patients", queries],
  });
};
