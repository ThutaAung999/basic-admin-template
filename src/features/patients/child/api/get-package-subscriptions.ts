import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { GetPackageSubscriptions, PatientSubscription } from "../..";

export const getPackageSubscription = async (
  queries?: GetPackageSubscriptions,
) => {
  return api
    .get<{
      data: PatientSubscription[];
      count: number;
    }>("/package-subscriptions", { params: queries })
    .then((res) => res.data);
};

export const useGetPackageSubscription = (
  queries?: GetPackageSubscriptions,
) => {
  return useQuery({
    queryFn: () => getPackageSubscription(queries),
    queryKey: ["package-subscriptions", queries],
  });
};
