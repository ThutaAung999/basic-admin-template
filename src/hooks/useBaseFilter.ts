import { DatesRangeValue } from "@mantine/dates";
import dayjs from "dayjs";
import { useCallback } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

export const useBaseFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const removeFalsyValues = (params: Record<string, any>) => {
    const final: URLSearchParamsInit = {};

    Object.entries(params).forEach(([key, value]) => {
      if (typeof value === "undefined" || value === null || value === "") {
        return;
      }

      final[key] = value;
    });

    return final;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getAllSearchParams = (): Record<string, any> => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  const onSearch = useCallback(
    (value?: string) => {
      setSearchParams(() =>
        removeFalsyValues({
          ...getAllSearchParams(),
          page: 1,
          search: value,
        }),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setSearchParams],
  );

  const onDateRangeChange = (value: Date[] | DatesRangeValue | null) => {
    if (value) {
      const [start, end] = value;

      if (start && end) {
        setSearchParams((prev) =>
          removeFalsyValues({
            ...prev,
            start: dayjs(start).toISOString(),
            end: dayjs(end).add(1, "days").toISOString(),
          }),
        );
      } else {
        setSearchParams((prev) =>
          removeFalsyValues({ ...prev, start: null, end: null }),
        );
      }
    }
  };

  const onPaginate = (page?: number) => {
    if (page) {
      setSearchParams(() =>
        removeFalsyValues({
          ...getAllSearchParams(),
          page,
        }),
      );
    }
  };

  return {
    onSearch,
    onPaginate,
    removeFalsyValues,
    onDateRangeChange,
    getAllSearchParams,
  };
};
