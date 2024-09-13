import { api } from "@/libs/axios";
import { MotherDto } from "./../schema/mother-patient";
import { useMutation } from "@tanstack/react-query";

export const createMotherPatient = async ({ data }: { data: MotherDto }) => {
  return api.post("/mothers/patients", data).then((res) => res.data);
};

export const useCreateMotherPatient = () => {
  return useMutation({
    mutationFn: createMotherPatient,
  });
};
