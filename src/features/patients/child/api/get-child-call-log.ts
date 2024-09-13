import { CallRecord } from "@/features/calllogs";
import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";

export const getChildCallLogsById = async ({
  id,
}: {
  id: string | undefined;
}) => {
  return api
    .get<{
      data: CallRecord[];
      count: number;
    }>(`/patients/${id}/call-logs`)
    .then((res) => res.data);
};

export const useGetChildCallLogsById = (id: { id: string | undefined }) => {
  return useQuery({
    queryKey: ["motherCalLogsById", id],
    queryFn: () => getChildCallLogsById(id),
  });
};
