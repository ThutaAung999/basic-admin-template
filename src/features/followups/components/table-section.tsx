import { Button, Pagination, Table } from "@/components";
import { Link } from "react-router-dom";
import { FollowUp, tableHeaders } from "../types";
import dayjs from "dayjs";
import { FaCheck } from "react-icons/fa6";
import { Tooltip } from "@mantine/core";
import { useFollowUpFilter } from "../hooks";

interface TableProps {
  data: {
    data: FollowUp[];
    count: number;
  };

  userType: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  page: string;
  limit: number;
}

const notFound = <p className="text-center">-</p>;

export const TableSection = ({
  data,
  userType,
  setId,
  page,
  limit,
}: TableProps) => {
  const { onPaginate } = useFollowUpFilter();

  return (
    <>
      <Table
        headerMapping={tableHeaders}
        data={data?.data}
        renderCells={(data) => ({
          patient: (
            <div>
              <Link
                to={
                  userType === "child"
                    ? `/patients/detail/${data?.patient?.id}`
                    : `/mothers/patients/detail/${data?.patient?.id}`
                }
                className=" no-underline"
                target="_blank"
              >
                <div className=" py-1">{data.patient?.name}</div>
              </Link>
              <div className="text-xs text-gray-500">
                {userType === "child"
                  ? `HN: ${data.patient?.hn}`
                  : data.patient?.patient_number}
              </div>
            </div>
          ),
          type: data.meta_data?.patient_type || notFound,
          careTaker: data.patient?.caretaker || notFound,
          membership: data.patient?.last_purchased_date
            ? "Extension"
            : "New Member",
          purchasedDate: dayjs(data.patient?.last_purchased_date).format(
            "MMM D YYYY",
          ),
          expirationDate: data.sale
            ? dayjs(data.sale?.expiration_date).format("MMM D YYYY")
            : notFound,
          followUpDate: data.follow_up_date
            ? dayjs(data.follow_up_date).format("MMM D YYYY")
            : notFound,
          reason: data.reason || notFound,
          status: data.status || notFound,
          user: data.user?.name || notFound,
          action: (
            <Tooltip label="Complete">
              <Button
                className={`${status === "completed" ? "hidden" : "block"}`}
                size="xs"
                onClick={() => {
                  setId(data._id);
                  open();
                }}
              >
                <FaCheck />
              </Button>
            </Tooltip>
          ),
        })}
        keyExtract={"_id"}
      />
      {data.count > 10 && (
        <Pagination
          value={parseInt(page)}
          total={Math.ceil(data?.count / limit)}
          onChange={onPaginate}
        />
      )}
    </>
  );
};
