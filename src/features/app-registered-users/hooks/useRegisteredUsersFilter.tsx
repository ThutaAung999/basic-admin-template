import { useBaseFilter } from "@/hooks";
import { DatesRangeValue } from "@mantine/dates";
import { useSearchParams } from "react-router-dom";

export const useRegisteredUsersFilter = () => {
  const [_, setSearchParams] = useSearchParams();
  const { removeFalsyValues, getAllSearchParams } = useBaseFilter();

  const onRegisteredDateRangeChange = (
    value: DatesRangeValue | Date[] | null,
  ) => {
    const startDate = value && value[0] ? value[0].toISOString() : undefined;
    const endDate = value && value[1] ? value[1].toISOString() : undefined;
    setSearchParams(() =>
      removeFalsyValues({
        ...getAllSearchParams(),
        page: 1,
        startDate,
        endDate,
      }),
    );
  };

  const clearDateRangeFilter = () => {
    setSearchParams(() =>
      removeFalsyValues({
        ...getAllSearchParams(),
        page: 1,
        startDate: undefined,
        endDate: undefined,
      }),
    );
  };
  return {
    ...useBaseFilter(),
    onRegisteredDateRangeChange,
    clearDateRangeFilter,
  };
};
