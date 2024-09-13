import { useBaseFilter } from "@/hooks";
import { ComboboxItem } from "@mantine/core";
import { DatesRangeValue } from "@mantine/dates";

import { useSearchParams } from "react-router-dom";

export const useMotherMemberRequestFilter = (
  _currentTab: string,
  requestMembersPage: number,
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { removeFalsyValues, getAllSearchParams } = useBaseFilter();

  const handleMotherMemberTypeChange = (
    value: string | null,
    _: ComboboxItem,
  ) => {
    setSearchParams(() =>
      removeFalsyValues({
        ...getAllSearchParams(),
        page: 1,
        member_type: value,
      }),
    );
  };

  const onPurchasedDateRangeChangeForMemReq = (
    value: DatesRangeValue | Date[] | null,
  ) => {
    // console.log("Date range selected:", value);

    const start = value && value[0] ? value[0].toISOString() : undefined;
    const end = value && value[1] ? value[1].toISOString() : undefined;
    setSearchParams(() =>
      removeFalsyValues({
        ...getAllSearchParams(),
        page: 1,
        start,
        end,
        //patient_type: "child",
        //    status: "pending",
      }),
    );
  };

  const clearDateRangeFilterForMemReq = () => {
    setSearchParams(() =>
      removeFalsyValues({
        ...getAllSearchParams(),
        page: 1,
        start: undefined,
        end: undefined,
        filter_type: undefined,
      }),
    );
  };

  const getSelectedMemberType = () => {
    return searchParams.get("member_type");
  };

  const buildUrlForTabChanges = () => {
    let baseUrl = `/mothers/patients?page=${requestMembersPage}&select=SUBSCRIPTIONS&limit=10&skip=${(requestMembersPage - 1) * 10}`;

    if (getSelectedMemberType()) {
      baseUrl += `&member_type=${getSelectedMemberType()}`;
    }

    return baseUrl;
  };

  return {
    ...useBaseFilter(),
    handleMotherMemberTypeChange,
    onPurchasedDateRangeChangeForMemReq,
    clearDateRangeFilterForMemReq,
    getAllSearchParams,
    getSelectedMemberType,
    buildUrlForTabChanges,
  };
};
