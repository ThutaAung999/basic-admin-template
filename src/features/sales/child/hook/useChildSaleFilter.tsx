import { useBaseFilter } from "@/hooks";
import { ComboboxItem } from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { DatesRangeValue } from "@mantine/dates";

export const useChildSaleFilter = () => {
  const [_, setSearchParams] = useSearchParams();
  const { removeFalsyValues, getAllSearchParams } = useBaseFilter();

  const handleMembershipChange = (value: string | null, _: ComboboxItem) => {
    setSearchParams(() =>
      removeFalsyValues({
        ...getAllSearchParams(),
        page: 1,
        membership: value === "All" ? undefined : value,
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
        filter_type: "PURCHASED_DATE",
      }),
    );
  };

  const onExpiredDateRangeChange = (value: DatesRangeValue | Date[] | null) => {
    const start = value && value[0] ? value[0].toISOString() : undefined;
    const end = value && value[1] ? value[1].toISOString() : undefined;
    setSearchParams(() =>
      removeFalsyValues({
        ...getAllSearchParams(),
        page: 1,
        start,
        end,
        filter_type: "EXPIRED_DATE",
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

  return {
    ...useBaseFilter(),
    handleMembershipChange,
    onPurchasedDateRangeChange,
    onExpiredDateRangeChange,
    clearDateRangeFilter,
  };
};
