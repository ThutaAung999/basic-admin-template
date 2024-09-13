import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { Patient, GetPatientsList } from "../..";

export const getChildPatientsList = async (queries?: GetPatientsList) => {
  return api
    .get<{
      data: Patient[];
      count: number;
    }>("/patients", { params: queries })
    .then((res) => res.data);
};

export const useGetChildPatientList = (queries?: GetPatientsList) => {
  return useQuery({
    queryFn: () => getChildPatientsList(queries),
    queryKey: ["child-patients", queries],
  });
};
