import { Loader, Tooltip } from "@mantine/core";
import { Patient } from "../..";

import { Table } from "@/components";
import { FaTrash } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { calculateAge, formatDate } from "@/features/utils";

interface PatientTableProps {
  data: Patient[];
  isLoading: boolean;
}

const tableHeadersForRegisterUsers = {
  name: "Name",
  age: "Age",
  type: "Type",
  diagnosis: "Diagnosis",
  careTaker: "CareTaker",
  membership: "Membership",
  createdDate: "Created Date",
  purchaseDate: "Purchase Date",
  expiration_date: "Expiration Date",
  AppUser: "AppUser",
  version: "Version",
  action: "Action",
};

export const RegisteredPatientTable = ({
  data,
  isLoading,
}: PatientTableProps) => {
  const navigate = useNavigate();
  return (
    <div>
      {data && (
        <>
          <Table
            data={data}
            headerMapping={tableHeadersForRegisterUsers}
            renderCells={(data) => ({
              name: (
                <div>
                  <div>{data?.name}</div>
                  <div className="text-gray-400">HN:{data?.hn}</div>
                </div>
              ),
              age: calculateAge(data.dob),
              type: data.last_customer_type,
              diagnosis: data?.past_diagnosis ? data?.past_diagnosis : "-",
              careTaker: (
                <div>
                  <div>{data?.caretaker}</div>
                  <div className="text-gray-400">{data?.contact_numbers}</div>
                </div>
              ),
              membership: data.membership_status,
              createdDate: formatDate(data.createdAt),
              purchaseDate: formatDate(data.last_purchased_date),
              expiration_date: formatDate(data.expiration_date),
              AppUser: (
                <div>
                  <div>{data?.app_user?.name}</div>
                  <div className="text-gray-400">
                    {data?.app_user?.phone_number}
                  </div>
                </div>
              ),
              version: data?.app_user?.app_version
                ? data?.app_user?.app_version
                : "-",
              action: (
                <div className="flex flex-row gap-5 mx-5">
                  <Tooltip
                    label="Details"
                    classNames={{
                      tooltip:
                        "bg-white text-black border border-solid border-black",
                    }}
                  >
                    <div
                      className="text-[20px] text-green-900 cursor-pointer"
                      onClick={() => {
                        navigate(`/patients/detail/${data._id}`);
                      }}
                    >
                      <FaInfoCircle />
                    </div>
                  </Tooltip>
                  <div
                    className="text-[20px] text-red-500 hover:text-red-800 cursor-pointer"
                    onClick={() => {}}
                  >
                    <FaTrash />
                  </div>
                </div>
              ),
            })}
            keyExtract={"_id"}
            noDataMessage={isLoading ? "" : "No Data Available in the table"}
            footer={
              isLoading && (
                <tr>
                  <td
                    colSpan={Object.keys(tableHeadersForRegisterUsers).length}
                  >
                    <div className="flex justify-center">
                      <Loader />
                    </div>
                  </td>
                </tr>
              )
            }
          />
        </>
      )}
    </div>
  );
};
