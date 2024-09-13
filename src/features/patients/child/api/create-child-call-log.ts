import { api } from "@/libs/axios";
import { useMutation } from "@tanstack/react-query";
import { CallLogDto } from "../schema";

export const createChildCallLog = async ({ data }: { data: CallLogDto }) => {
  return api.post("/call_logs", data).then((res) => res);
};

export const useCreateChildCallLog = () => {
  return useMutation({
    mutationFn: createChildCallLog,
  });
};
