import { DatePickerInput, ExportButton } from "@/components";
import { Paper } from "@mantine/core";

import { DatesRangeValue } from "@mantine/dates";
import { User } from "..";
import React from "react";

interface RegisteredUsersExportAndFilterProps {
  handleDatePickerChange: (value: DatesRangeValue | Date[] | null) => void;
  getData: () => Promise<User[] | undefined>;

  formatData: (value: User) => Record<string, string | number>;

  isExportEnabled: boolean;
  dateValue: DatesRangeValue;
  hasData: boolean;
}

export const RegisteredUsersExportAndFilter: React.FC<
  RegisteredUsersExportAndFilterProps
> = ({
  handleDatePickerChange,
  getData,
  formatData,
  isExportEnabled,
  dateValue,
  hasData,
}) => {
  return (
    <Paper withBorder shadow="10">
      <div className="flex justify-end items-center my-5 gap-2 mx-3">
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
          disabled={isExportEnabled || hasData}
        />
      </div>
    </Paper>
  );
};
