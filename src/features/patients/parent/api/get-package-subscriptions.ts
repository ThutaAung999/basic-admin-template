import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { GetPackageSubscriptions, PatientSubscription } from "../..";

export const getMotherPackageSubscription = async (
  queries?: GetPackageSubscriptions,
) => {
  return api
    .get<{
      data: PatientSubscription[];
      count: number;
    }>("/package-subscriptions", { params: queries })
    .then((res) => res.data);
};

export const useGetMotherPackageSubscription = (
  queries?: GetPackageSubscriptions,
) => {
  return useQuery({
    queryFn: () => getMotherPackageSubscription(queries),
    queryKey: ["mother-package-subscriptions", queries],
  });
};
