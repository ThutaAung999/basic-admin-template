import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";
import { EditFollowUpStatus } from "../..";

export const editMotherFollowUpStatus = async ({
  id,
  data,
}: {
  id: string;
  data: EditFollowUpStatus;
}) => {
  return api.patch(`/mothers/follow_ups/${id}`, data).then((res) => res.data);
};

export const useEditMotherFollowUsStatus = () => {
  return useMutation({
    mutationFn: editMotherFollowUpStatus,
  });
};
