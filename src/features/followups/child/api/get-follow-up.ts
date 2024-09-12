import { api } from "@/libs/axios";
import { FollowUp, GetFollowUps } from "../../types";
import { useQuery } from "@tanstack/react-query";

export const getFollowUps = async (queries?: GetFollowUps) => {
  return api
    .get<{
      data: FollowUp[];
      count: number;
    }>("/follow_ups", { params: queries })
    .then((res) => res.data);
};

export const useGetFollowUps = (queries?: GetFollowUps) => {
  return useQuery({
    queryFn: () => getFollowUps(queries),
    queryKey: ["followUps", queries],
  });
};
