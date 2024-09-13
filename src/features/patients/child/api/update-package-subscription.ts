import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateResponse, UpdateData } from "../..";
import { api } from "@/libs/axios";

const handleForCallStatus = async ({
  id,
  updateData,
}: {
  id: string;
  updateData: UpdateData;
}): Promise<UpdateResponse> => {
  const response = await api.patch<UpdateResponse>(
    `/package-subscriptions/${id}`,
    updateData,
  );
  return response.data;
};

export const useUpdatePackageSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateResponse,
    Error,
    { id: string; updateData: UpdateData }
  >({
    mutationFn: handleForCallStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["package-subscriptions"] });
    },
  });
};
