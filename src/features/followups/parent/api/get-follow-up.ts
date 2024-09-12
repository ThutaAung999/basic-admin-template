import { api } from "@/libs/axios";
import { useQuery } from "@tanstack/react-query";
import { FollowUp, GetFollowUps } from "../../types";

export const getMotherFollowUp = async (queries?: GetFollowUps) => {
  return api
    .get<{
      data: FollowUp[];
      count: number;
    }>("/mothers/follow_ups", { params: queries })
    .then((res) => res.data);
};

export const useGetMotherFollowUp = (queries?: GetFollowUps) => {
  return useQuery({
    queryFn: () => getMotherFollowUp(queries),
    queryKey: ["mother-follow-ups", queries],
  });
};
