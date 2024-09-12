import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const deleteChildSale = async ({ id }: { id: string }) =>
  api.delete(`/sales/${id}`).then((res) => res.data);

export const useDeleteChildSale = () =>
  useMutation({ mutationFn: deleteChildSale });
