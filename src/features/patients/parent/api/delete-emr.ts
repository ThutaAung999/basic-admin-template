import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const deleteEmr = async ({
  photoId,
  patientId,
}: {
  photoId: string;
  patientId: string;
}) => {
  return api
    .delete(`/mothers/patients/${patientId}/photos/${photoId}`)
    .then((res) => res);
};
// mothers/patients/66b9b9114a6b34001532ebec/photos/66b9c4324a6b34001
// mothers/patients/66b9b9114a6b34001532ebec/photos

export const useDeleteEmr = () => {
  return useMutation({
    mutationFn: deleteEmr,
  });
};
