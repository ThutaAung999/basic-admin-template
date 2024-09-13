import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { Child } from "../../types";

export const getPatientById = async ({ id }: { id: string | undefined }) => {
  return api.get<Child>(`/patients/${id}`).then((res) => res.data);
};

export const useGetPatientById = (id: { id: string | undefined }) => {
  return useQuery({
    queryKey: ["childPatient", id],
    queryFn: () => getPatientById(id),
  });
};
