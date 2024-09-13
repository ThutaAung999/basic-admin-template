import { useBaseFilter } from "@/hooks";

import { DatesRangeValue } from "@mantine/dates";

import { useSearchParams } from "react-router-dom";

export const useMotherPatientListFilter = (
  currentTab: string,
  registeredPage: number,
  existingMembersPage: number,
) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { removeFalsyValues, getAllSearchParams } = useBaseFilter();

  const handlePatientTypeChange = (value: string | null) => {
    setSearchParams(() =>
      removeFalsyValues({
        ...getAllSearchParams(),
        page: 1,
        last_customer_type: value === "All" ? undefined : value,
        //patient_type: "subscriber",
      }),
    );
  };

  const onPurchasedDateRangeChange = (
    value: DatesRangeValue | Date[] | null,
  ) => {
    const start = value && value[0] ? value[0].toISOString() : undefined;
    const end = value && value[1] ? value[1].toISOString() : undefined;
    setSearchParams(() =>
      removeFalsyValues({
        ...getAllSearchParams(),
        page: 1,
        start,
        end,
      }),
    );
  };

  const clearDateRangeFilter = () => {
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

  const getSelectedPatientType = () => {
    //  console.log(searchParams.get("last_customer_type"));
    return searchParams.get("last_customer_type");
  };

  const buildUrlForTabChanges = () => {
    let baseUrl = `/mothers/patients?page=`;

    switch (currentTab) {
      case "registered-users":
        baseUrl += `${registeredPage}`;
        if (getSelectedPatientType()) {
          baseUrl += `&last_customer_type=${getSelectedPatientType()}`;
        }
        break;

      case "existing-members":
        baseUrl += `${existingMembersPage}&patient_type=subscriber`;
        if (getSelectedPatientType()) {
          baseUrl += `&last_customer_type=${getSelectedPatientType()}`;
        }
        break;

      default:
        break;
    }

    return baseUrl;
  };

  return {
    ...useBaseFilter(),
    handlePatientTypeChange,
    onPurchasedDateRangeChange,
    clearDateRangeFilter,
    getSelectedPatientType,
    buildUrlForTabChanges,
  };
};
