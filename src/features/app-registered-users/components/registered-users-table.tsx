import { Loader } from "@mantine/core";
import { FaTrash } from "react-icons/fa6";
import { Table, Pagination } from "@/components";
import { User, useRegisteredUsersFilter } from "..";
import { formatDate } from "@/features/utils";

import { calculateAge, formatTime } from "../../utils/dateUtils";

interface RegisteredUserTableProps {
  data: User[];
  isLoading: boolean;
  page: number;
  limit: number;
  totalCount: number;
  openDeleteModal: (id: string) => void;
}

const tableHeaders = {
  registeredDate: "Registered Date",
  registeredTime: "Registered Time",
  user_id: "User ID",
  name: "Name",
  age: "Age",
  phNo: "Phone Number",
  region: "Region ",
  township: "Township",
  os: "OS Platform",
  app_version: "App Version",
  action: "Action",
};

export const RegisteredUsersTable = ({
  data,
  isLoading,
  page,
  limit,
  totalCount,
  openDeleteModal,
}: RegisteredUserTableProps) => {
  const { onPaginate } = useRegisteredUsersFilter();

  return (
    <>
      {(data && (
        <>
          <div className="mx-3">
            <Table
              noDataMessage={data ? "" : "No data available"}
              data={data}
              headerMapping={tableHeaders}
              renderCells={(row) => ({
                registeredDate: row?.registeredAt
                  ? formatDate(row?.registeredAt)
                  : "-",
                registeredTime: row.registeredAt
                  ? formatTime(row.registeredAt)
                  : "-",
                user_id: row?.user_id,
                name: row?.name ? row?.name : "-",
                age: row?.dob ? calculateAge(row?.dob) : "-",
                phNo: row?.phone_number ? row?.phone_number : "-",
                region: row?.address?.sr?.name ? row?.address?.sr?.name : "-",
                township: row?.address?.township?.name
                  ? row?.address?.township?.name
                  : "-",
                os: row?.os_platform ? row?.os_platform : "-",
                app_version: row?.app_version ? row?.app_version : "-",

                action: (
                  <div
                    className="text-[20px] text-red-500 hover:text-red-800 cursor-pointer"
                    onClick={() => openDeleteModal(row?._id)}
                  >
                    <FaTrash />
                  </div>
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
              {data && !isLoading ? (
                <Pagination
                  value={page}
                  total={Math.ceil(totalCount / limit)}
                  onChange={onPaginate}
                />
              ) : null}
            </div>
          </div>
        </>
      )) ||
        []}
    </>
  );
};
