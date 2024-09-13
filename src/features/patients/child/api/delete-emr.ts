import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const deleteChildEmr = async ({
  patientId,
  photoId,
}: {
  patientId: string;
  photoId: string;
}) => {
  return api
    .delete(`/patients/${patientId}/photos/${photoId}`)
    .then((res) => res);
};

export const useDeleteChildEmr = () => {
  return useMutation({
    mutationFn: deleteChildEmr,
  });
};
