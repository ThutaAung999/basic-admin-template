import React from "react";
import { Modal, Text, Group, Divider, Grid } from "@mantine/core";
import { Button } from "@/components";

import { FaCheck } from "react-icons/fa6";
import { CallRecord } from "../../type";
import { formatDate, formatDateTime } from "@/features/utils";

interface CallLogModalProps {
  opened: boolean;
  onClose: () => void;
  selectedRow: CallRecord | null;
}

const tableHeaders = {
  type: "Type",
  start: "Start",
  end: "End",
  callNo: "Caller No",
  patient: "Patient",
  chiefComplaint: "Chief Complaint",
  hopi: "HOPI",
  initialTreatement: "Initial Treatement",
  callDiagnosis: "Call Diagnosis",
  follow_up: "Follow Up",
  follow_up_comment: "Follow_Up_Comment",
  follow_up_date: "Follow_Up_Date",
};

type TableHeadersKey = keyof typeof tableHeaders;

const gridCaption: Exclude<TableHeadersKey, "action">[] = [
  "type",
  "start",
  "end",
  "callNo",
  "patient",
  "chiefComplaint",
  "hopi",
  "initialTreatement",
  "callDiagnosis",
  "follow_up",
  "follow_up_comment",
  "follow_up_date",
];

export const CallLogModal: React.FC<CallLogModalProps> = ({
  opened,
  onClose,
  selectedRow,
}) => {
  const renderModalCells = (data: CallRecord) => ({
    type: data.call_type ? data.call_type : "-",
    start: data.call_start_time ? formatDateTime(data.call_start_time) : "-",
    end: formatDateTime(data.call_end_time),
    callNo: data.phone ? data.phone : "-",
    patient: data.patient?.name ? data.patient?.name : "-",
    chiefComplaint: data.chief_complaint ? data.chief_complaint : "-",
    hopi: data.hopi ? data.hopi : "-",
    initialTreatement: data.initial_treatment ? data.initial_treatment : "-",
    callDiagnosis: data.diagnosis?.name ? data.diagnosis?.name : "-",
    follow_up: data.follow_up ? <FaCheck /> : "-",
    follow_up_comment: data.follow_up?.reason ? data.follow_up?.reason : "-",
    follow_up_date: data.follow_up?.follow_up_date
      ? formatDate(data.follow_up?.follow_up_date)
      : "-",
  });

  return (
    <Modal
      opened={opened}
      closeOnClickOutside={false}
      onClose={onClose}
      withCloseButton={false}
      overlayProps={{
        opacity: 0.7,
      }}
      size="lg"
    >
      <div className="grid grid-cols-2 mb-6">
        <div className="grid grid-rows-2">
          <Text style={{ fontWeight: 500, color: "gray", fontSize: "13px" }}>
            VisitID:
          </Text>
          <Text>{selectedRow?._id}</Text>
        </div>
        <div className="grid grid-rows-2">
          <Text style={{ fontWeight: 500, color: "gray", fontSize: "13px" }}>
            UserID:
          </Text>
          <Text>{selectedRow?.user._id}</Text>
        </div>
      </div>
      <Divider my="md" />
      <Grid className="mx-3">
        {selectedRow &&
          gridCaption.map((key) => (
            <Grid.Col span={6} key={key}>
              <Text
                style={{ fontWeight: 500, color: "gray", fontSize: "13px" }}
              >
                {tableHeaders[key]}:
              </Text>
              <Text>
                {
                  renderModalCells(selectedRow)[
                    key as Exclude<TableHeadersKey, "action">
                  ]
                }
              </Text>
            </Grid.Col>
          ))}
      </Grid>
      <Group
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Button onClick={onClose}>Close</Button>
      </Group>
    </Modal>
  );
};
