import { DatePickerInput, ExportButton, Select } from "@/components";
import { Paper } from "@mantine/core";
import { PATIENT_TYPES } from "../constants";
import { DatesRangeValue } from "@mantine/dates";
import { CallRecord } from "../type";
import React from "react";
import { useChildCallLogFilter } from "../hooks";

interface CallLogExportAndFilterProps {
  // handlePatientTypeChange: (value: string) => void;
  handleDatePickerChange: (value: DatesRangeValue | Date[] | null) => void;
  getData: () => Promise<CallRecord[] | undefined>;

  formatData: (value: CallRecord) => Record<string, string | number>;

  isExportEnabled: boolean;
  dateValue: DatesRangeValue;
}

export const CallLogExportAndFilter: React.FC<CallLogExportAndFilterProps> = ({
  handleDatePickerChange,
  getData,
  formatData,
  isExportEnabled,
  dateValue,
}) => {
  const { handlePatientTypeChange } = useChildCallLogFilter();
  return (
    <Paper withBorder shadow="10">
      <div className="flex justify-end items-center my-5 gap-2 mx-3">
        <Select
          placeholder="Select patient type..."
          data={PATIENT_TYPES}
          onChange={handlePatientTypeChange}
        />

        <div className="flex items-center gap-2">
          <DatePickerInput
            type="range"
            value={dateValue}
            onChange={handleDatePickerChange}
            placeholder="Filter by date range..."
          />
        </div>

        <ExportButton
          getData={getData}
          format={formatData}
          className=" text-green-900 "
          filename="child_call_log_export.csv"
          disabled={!isExportEnabled}
        />
      </div>
    </Paper>
  );
};
