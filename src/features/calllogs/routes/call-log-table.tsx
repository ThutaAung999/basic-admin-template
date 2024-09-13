import React, { useState } from "react";
import { Loader, Tooltip } from "@mantine/core";
import { FaInfoCircle } from "react-icons/fa";
import { Table, Pagination } from "@/components";
import { CallRecord, useChildCallLogFilter } from "..";
import { formatDateTime } from "../../../patients/utils/dateUtils";
import { CallLogModal } from "./call-log-modal";

interface CallLogTableProps {
  data: CallRecord[];
  isLoading: boolean;
  page: number;
  limit: number;
  totalCount: number;
}

const tableHeaders = {
  type: "Type",
  start: "Start",
  end: "End",
  callNo: "Caller No",
  medicine: "Medicine",
  patient: "Patient",
  // hn: "Hospital No",
  patientType: "Patient Type",
  chiefComplaint: "Chief Complaint",
  hopi: "HOPI",
  initialTreatement: "Initial Treatement",
  callDiagnosis: "Call Diagnosis",
  user: "User",
  action: "Action",
};

export const CallLogTable: React.FC<CallLogTableProps> = ({
  data,
  isLoading,
  page,
  limit,
  totalCount,
}) => {
  const { onPaginate } = useChildCallLogFilter();

  const [opened, setOpened] = useState(false);

  const [selectedRow, setSelectedRow] = useState<CallRecord | null>(null);

  const openModal = (row: CallRecord) => {
    setSelectedRow(row);
    setOpened(true);
  };

  return (
    <>
      {data && (
        <>
          <div className="mx-3">
            <Table
              noDataMessage="No data available"
              data={data}
              headerMapping={tableHeaders}
              renderCells={(row) => ({
                type: row.call_type ? row.call_type : "-",
                start: row.call_start_time
                  ? formatDateTime(row.call_start_time)
                  : "-",
                end: row.call_end_time
                  ? formatDateTime(row.call_end_time)
                  : "-",
                callNo: row.phone ? row.phone : "-",
                medicine: row.is_medicine_required ? "YES" : "NO",
                patient: (
                  <div>
                    <div>{row.patient?.name ? row.patient?.name : "-"}</div>
                    <div className="text-gray-400">
                      HN: {row.patient?.hn ? row.patient?.hn : "-"}
                    </div>
                  </div>
                ),
                patientType: row.patient?.last_customer_type
                  ? row.patient?.last_customer_type
                  : "-",
                chiefComplaint: row.chief_complaint ? row.chief_complaint : "-",
                hopi: row.hopi ? row.hopi : "-",
                initialTreatement: row.initial_treatment
                  ? row.initial_treatment
                  : "-",
                callDiagnosis: row.diagnosis?.name ? row.diagnosis?.name : "-",
                user: row.user?.name ? row.user?.name : "-",

                action: (
                  <Tooltip
                    label="Details"
                    classNames={{
                      tooltip: "bg-white text-black border-solid border-black",
                    }}
                  >
                    <div
                      className="text-[20px] text-green-900"
                      onClick={() => openModal(row)}
                    >
                      <FaInfoCircle />
                    </div>
                  </Tooltip>
                ),
              })}
              keyExtract="_id"
            />
            {isLoading && (
              <div className="flex justify-center">
                <Loader />
              </div>
            )}

            <div className="my-6">
              {data ? (
                <Pagination
                  value={page}
                  total={Math.ceil(totalCount / limit)}
                  onChange={onPaginate}
                />
              ) : null}
            </div>
          </div>
        </>
      )}

      <CallLogModal
        opened={opened}
        onClose={() => setOpened(false)}
        selectedRow={selectedRow}
      />
    </>
  );
};
