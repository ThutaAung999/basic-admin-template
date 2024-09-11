import { api } from "@/libs/axios";
import { BaseConsultantDto } from "..";
import { useMutation } from "@tanstack/react-query";

export const addConsultant = async (data: BaseConsultantDto) =>
  api.post("/consultants", data).then((res) => res.data);

export const useAddConsultant = () =>
  useMutation({ mutationFn: addConsultant });
