import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const uploadChildEmr = async ({
  id,
  file,
}: {
  id: string;
  file: FormData;
}) => {
  return api.post(`/patients/${id}/photos`, file).then((res) => res);
};

export const useUplaodChildEmr = () => {
  return useMutation({
    mutationFn: uploadChildEmr,
  });
};
