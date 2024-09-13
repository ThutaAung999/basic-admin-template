import { Button, DatePickerInput, ExportButton } from "@/components";
import { useBaseFilter } from "@/hooks";
import { DatesRangeValue } from "@mantine/dates";
import { ComponentProps, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {
  exportProps: Pick<
    ComponentProps<typeof ExportButton>,
    "getData" | "format" | "disabled" | "className" | "filename"
  >;
  showAddNewPatientButton?: boolean;
};

export const MotherPatientListTabRightSection = ({
  exportProps,
  showAddNewPatientButton = true,
}: Props) => {
  const { getAllSearchParams, onDateRangeChange } = useBaseFilter();
  const { start, end } = getAllSearchParams();
  const [dateRange, setDateRange] = useState<DatesRangeValue>([
    start ? new Date(start) : null,
    end ? new Date(end) : null,
  ]);

  const isExportDisabled = !start || !end;

  return (
    <div className="flex flex-col sm:flex-row flex-none justify-end items-center gap-2 ">
      {showAddNewPatientButton ? (
        <Link to="/mothers/patients/create" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto" size="md">
            <FaPlusCircle className="me-1" />
            ADD NEW PATIENT
          </Button>
        </Link>
      ) : null}

      <DatePickerInput
        type="range"
        value={dateRange}
        onChange={(value) => {
          setDateRange(value as DatesRangeValue);
          onDateRangeChange(value);
        }}
        placeholder="Filter by purchased date"
        className="w-full sm:w-auto"
      />

      <ExportButton
        className="w-full sm:w-auto text-green-900 "
        disabled={isExportDisabled}
        {...exportProps}
      />
    </div>
  );
};
