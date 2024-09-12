import { DatePickerInput, ExportButton, Select } from "@/components";
import { toast } from "@/libs/mantine-toast";
import dayjs from "dayjs";
import { CHILD_PATIENT_TYPES, FollowUp, MOTHER_PATIENT_TYPES } from "../types";
import { getFollowUps } from "../child";
import { getMotherFollowUp } from "../parent";
import { DatesRangeValue } from "@mantine/dates";
import { useFollowUpFilter } from "../hooks/useFollowUpFilter";

interface RightHeaderSectionProps {
  userType: string;
  search: string;
  handleChangeDateRange: (value: DatesRangeValue | Date[] | null) => void;
  date: DatesRangeValue | Date[] | null;
}

export const RightHeaderSection = ({
  userType,
  handleChangeDateRange,
  date,
}: RightHeaderSectionProps) => {
  const { getAllSearchParams, handleChangePatientType } = useFollowUpFilter();
  const { follow_up_type, patient_type, status, search } = getAllSearchParams();

  const start = date?.[0]?.toISOString() ?? undefined;
  const end = date?.[1]?.toISOString() ?? undefined;

  const formatFollowUp = (
    followUp: FollowUp,
  ): Record<string, string | number> => {
    return {
      Patient: followUp.patient?.name || "-",
      Type: followUp.meta_data?.patient_type || "-",
      Caretaker: followUp.patient.caretaker || "-",
      PurchasedDate: dayjs(followUp?.patient.last_purchased_date).format(
        "MMM D YYYY",
      ),
      followUpDate: followUp.follow_up_date
        ? dayjs(followUp.follow_up_date).format("MMM D YYYY")
        : "-",
      ExpirationDate: followUp.sale
        ? dayjs(followUp.sale?.expiration_date).format("MMM D YYYY")
        : "-",
      Reason: followUp.reason || "-",
      Status: followUp.status || "-",
      User: followUp.user?.name || "-",
    };
  };

  const getData = async () => {
    if (userType === "child") {
      try {
        const { data } = await getFollowUps({
          search,
          start,
          end,
          patient_type,
          status: status ?? "pending",
          limit: 0,
          follow_up_type: follow_up_type ?? "SCHEDULED",
        });
        return data;
      } catch (error) {
        if (error instanceof Error) {
          toast.error({ message: error.message });
        }
      }
    } else if (userType === "mother") {
      try {
        const { data } = await getMotherFollowUp({
          search,
          start,
          end,
          patient_type,
          status: status ?? "pending",
          limit: 0,
          follow_up_type: follow_up_type ?? "SCHEDULED",
        });
        return data;
      } catch (error) {
        if (error instanceof Error) {
          toast.error({ message: error.message });
        }
      }
    }
  };

  return (
    <div className="ms-2 flex gap-2 items-center">
      <Select
        data={userType === "child" ? CHILD_PATIENT_TYPES : MOTHER_PATIENT_TYPES}
        placeholder="Select patient type"
        onChange={handleChangePatientType}
        clearable
        defaultValue={patient_type}
      />
      <ExportButton
        filename="Follow Ups"
        disabled={!(start && end)}
        getData={getData}
        format={formatFollowUp}
      />
      <DatePickerInput
        placeholder="Filter by follow up date"
        type="range"
        value={date}
        onChange={handleChangeDateRange}
      />
    </div>
  );
};
