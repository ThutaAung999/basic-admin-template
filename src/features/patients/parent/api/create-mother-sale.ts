import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";
import { MotherSaleDto } from "../schema";

export const createMotherSale = async ({ data }: { data: MotherSaleDto }) => {
  return api.post("/mothers/sales", data).then((res) => res);
};

export const useCreateMotherSale = () => {
  return useMutation({
    mutationFn: createMotherSale,
  });
};
