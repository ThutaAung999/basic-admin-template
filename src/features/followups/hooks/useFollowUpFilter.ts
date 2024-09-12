import { useBaseFilter } from "@/hooks";
import { useSearchParams } from "react-router-dom";

export const useFollowUpFilter = () => {
  const [_, setSearchParams] = useSearchParams();
  const { removeFalsyValues, getAllSearchParams } = useBaseFilter();

  const handleChangePatientType = (value: string | null) => {
    setSearchParams(() =>
      removeFalsyValues({
        ...getAllSearchParams(),
        page: 1,
        patient_type: value === "All" ? undefined : value,
      }),
    );
  };

  const handleChangeStatus = (value: string | null) => {
    setSearchParams(() =>
      removeFalsyValues({
        ...getAllSearchParams(),
        page: 1,
        status: value,
      }),
    );
  };

  const handleChangeTab = (value: string) => {
    setSearchParams(() =>
      removeFalsyValues({
        ...getAllSearchParams(),
        page: 1,
        follow_up_type: value,
      }),
    );
  };

  return {
    ...useBaseFilter(),
    handleChangePatientType,
    handleChangeStatus,
    handleChangeTab,
  };
};
