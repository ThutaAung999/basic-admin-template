import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const deleteRegisteredUsers = async ({ id }: { id: string }) =>
  api.delete(`/app_users/${id}`).then((res) => res.data);

export const useDeleteRegisteredUsers = () =>
  useMutation({ mutationFn: deleteRegisteredUsers });
