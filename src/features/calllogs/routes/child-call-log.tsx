import { Searchbox, Header } from "@/components";

import { Container, Paper, Stack } from "@mantine/core";
import { useState } from "react";

import { useGetChildCallLogs } from "../api";
import { useDebouncedCallback } from "@mantine/hooks";
import { DatesRangeValue } from "@mantine/dates";
import { CallRecord, useChildCallLogFilter } from "..";
//import { CallLogModal } from "./call-log-modal";
import { CallLogTable } from "./call-log-table";
import { CallLogExportAndFilter } from "./call-log-export-and-filter";
import { getChildCallLogs } from "../api/get-child-call-logs";
import { toast } from "@/libs/mantine-toast";

export const ChildCallLog: React.FC = () => {
  const { onSearch, getAllSearchParams, onDateRangeChange } =
    useChildCallLogFilter();

  const {
    page = 1,
    limit = 10,
    search,
    patient_type,
    start,
    end,
  } = getAllSearchParams();

  const [dateValue, setDateValue] = useState<DatesRangeValue>([
    start ? new Date(start) : null,
    end ? new Date(end) : null,
  ]);

  const [value, setValue] = useState(search);

  const [isExportEnabled, setIsExportEnabled] = useState(false);

  const debouncedOnSearch = useDebouncedCallback(onSearch, 500);

  const { data, isLoading } = useGetChildCallLogs({
    limit,
    search,
    skip: (page - 1) * limit,
    patient_type,
    start,
    end,
  });

  const handleDatePickerChange = (value: DatesRangeValue | Date[] | null) => {
    if (Array.isArray(value) && value.length === 2) {
      setDateValue([value[0] ?? null, value[1] ?? null]);

      onDateRangeChange(value);

      setIsExportEnabled(value[0] !== null && value[1] !== null);
    } else {
      setDateValue([null, null]);
      onDateRangeChange(null);

      setIsExportEnabled(false);
    }
  };

  const getData = async () => {
    try {
      const { data } = await getChildCallLogs({
        search,
        start,
        end,
        limit: 0,
      });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error({ message: error.message });
      }
    }
  };

  const formatData = (item: CallRecord) => ({
    Type: item.call_type ? item.call_type : "-",
    Start: item.call_start_time ? item.call_start_time : "-",
    End: item.call_end_time ? item.call_end_time : "-",
    CallerNo: item.phone ? item.phone : "-",
    Medicine: item.is_medicine_required ? "YES" : "NO",
    Patient: item.patient?.name ? item.patient?.name : "-",
    hn: item.patient?.hn ? item.patient?.hn : "-",
    PatientType: item.patient?.last_customer_type
      ? item.patient?.last_customer_type
      : "-",
    ChiefComplaint: item.chief_complaint ? item.chief_complaint : "-",
    HOPI: item.hopi ? item.hopi : "-",
    InitialTreatement: item.initial_treatment ? item.initial_treatment : "-",
    CallDiagnosis: item.diagnosis?.name ? item.diagnosis?.name : "-",
    User: item.user?.name ? item.user?.name : "-",
  });

  /* const openModal = (row: CallRecord) => {
    setSelectedRow(row);
    setOpened(true);
  }; */

  return (
    <Container fluid>
      <Header title="Child call log :" dataCount={data?.count}>
        <span className="text-lg font-bold"></span>

        <Searchbox
          name="search"
          placeholder="Search by Consultant Name"
          value={value}
          onChange={(value) => {
            setValue(value);
            debouncedOnSearch(value);
          }}
        />
      </Header>

      <Paper>
        <Stack style={{ overflowX: "auto" }} gap="lg">
          <CallLogExportAndFilter
            handleDatePickerChange={handleDatePickerChange}
            getData={getData}
            formatData={formatData}
            isExportEnabled={isExportEnabled}
            dateValue={dateValue}
          />

          <CallLogTable
            data={data?.data || []}
            isLoading={isLoading}
            page={parseInt(page, 10)}
            limit={limit}
            totalCount={data?.count as number}
          />
        </Stack>
      </Paper>
    </Container>
  );
};
