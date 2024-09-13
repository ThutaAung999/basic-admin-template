import { useMutation } from "@tanstack/react-query";
import { EditMotherDto } from "../schema";
import { api } from "@/libs/axios";

export const editMotherPatient = async ({
  id,
  ...data
}: { id: string | undefined } & EditMotherDto) => {
  return api.put(`/mothers/patients/${id}`, data).then((res) => res.data);
};

export const useEditMotherPatient = () => {
  return useMutation({
    mutationFn: editMotherPatient,
  });
};
