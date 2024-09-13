import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";
import { ChildDto } from "../schema/patient";

export const createChildPatient = async ({ data }: { data: ChildDto }) => {
  return api.post("/patients", data).then((res) => res);
};

export const useCreateChildPatient = () => {
  return useMutation({
    mutationFn: createChildPatient,
  });
};
