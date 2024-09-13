import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";
import { MotherCallLogDto } from "../schema";

export const createMotherCallLog = async ({
  data,
}: {
  data: MotherCallLogDto;
}) => {
  return api.post("/mothers/call_logs", data).then((res) => res);
};

export const useCreateMotherCallLog = () => {
  return useMutation({
    mutationFn: createMotherCallLog,
  });
};
