import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";
import { EditFollowUpStatus } from "../..";

export const editFollowUpStatus = async ({
  id,
  data,
}: {
  id: string;
  data: EditFollowUpStatus;
}) => {
  return api.put(`/follow_ups/${id}`, data).then((res) => res.data);
};

export const useEditFollowUpStatus = () => {
  return useMutation({ mutationFn: editFollowUpStatus });
};
