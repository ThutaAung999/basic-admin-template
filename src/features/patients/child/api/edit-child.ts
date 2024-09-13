import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";
import { EditChildDto } from "../schema";

export const editChild = async ({
  id,
  ...data
}: { id: string | undefined } & EditChildDto) => {
  return api.put(`/patients/${id}`, data).then((res) => res.data);
};

export const useEditChild = () => {
  return useMutation({
    mutationFn: editChild,
  });
};
