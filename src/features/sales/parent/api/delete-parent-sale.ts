import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";

export const deleteParentSale = async ({ id }: { id: string }) =>
  api.delete(`/mothers/sales/${id}`).then((res) => res.data);

export const useDeleteParentSale = () =>
  useMutation({ mutationFn: deleteParentSale });
