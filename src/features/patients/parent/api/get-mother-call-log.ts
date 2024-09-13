import { CallRecord } from "@/features/calllog/mother";
import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const getMotherCallLogsById = async ({
  id,
}: {
  id: string | undefined;
}) => {
  return api
    .get<{
      data: CallRecord[];
      count: number;
    }>(`/mothers/patients/${id}/call-logs`)
    .then((res) => res.data);
};

export const useGetMotherCallLogsById = (id: { id: string | undefined }) => {
  return useQuery({
    queryKey: ["motherCalLogsById", id],
    queryFn: () => getMotherCallLogsById(id),
  });
};
