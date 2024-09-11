import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";
import { BaseConsultantDto } from "..";

export const editConsultant = async ({
  id,
  ...data
}: BaseConsultantDto & { id: string }) =>
  api.put(`/consultants/${id}`, data).then((res) => res.data);

export const useEditConsultant = () =>
  useMutation({ mutationFn: editConsultant });
