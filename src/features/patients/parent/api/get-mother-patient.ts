import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { Mother } from "../../types";

export const getMotherPatientById = async ({
  id,
}: {
  id: string | undefined;
}) => {
  return api.get<Mother>(`/mothers/patients/${id}`).then((res) => res.data);
};

export const useGetMotherPatientById = (id: { id: string | undefined }) => {
  return useQuery({
    queryKey: ["motherPatient", id],
    queryFn: () => getMotherPatientById(id),
  });
};
