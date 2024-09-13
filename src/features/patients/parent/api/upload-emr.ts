import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const uploadEmr = async ({
  id,
  file,
}: {
  id: string;
  file: FormData;
}) => {
  return api.post(`/mothers/patients/${id}/photos`, file).then((res) => res);
};

export const useUploadEmr = () => {
  return useMutation({
    mutationFn: uploadEmr,
  });
};
