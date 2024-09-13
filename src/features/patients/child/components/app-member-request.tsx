import { Loader, Tooltip, Divider, Textarea } from "@mantine/core";

import { Button, Modal, Select, Table } from "@/components";
import {
  FaTrash,
  FaInfoCircle,
  FaCheckSquare,
  FaPenFancy,
} from "react-icons/fa";
import { useState } from "react";
import { PatientSubscription, UpdateData } from "../..";
import { useUpdatePackageSubscription } from "../api/update-package-subscription";

import { STATUA_VALUE } from "@/features/sharedConstants";
import { useNavigate } from "react-router-dom";
import { calculateAge, formatDate, formatDateTime } from "@/features/utils";

interface PatientTableProps {
  data: PatientSubscription[];
  isLoading: boolean;
}

const tableHeadersForAppMemberRequests = {
  requestedDateTime: "Requested Date Time",
  name: "Name",
  careTaker: "CareTaker",
  month: "Month",
  membership: "Membership",
  purchaseDate: "Purchase Date",
  expiration_date: "Expiration Date",
  callStatus: "Call Status",
  remark: "Remark",
  version: "App Version",
  action: "Action",
};

export const AppMemberRequest = ({ data, isLoading }: PatientTableProps) => {
  const navigate = useNavigate();

  const mutation = useUpdatePackageSubscription();

  const [modalState, setModalState] = useState({
    type: "",
    isOpen: false,
    id: null as number | null,
  });

  const [remark, setRemark] = useState("");
  const [selectedCallStatus, setSelectedCallStatus] = useState("");

  const openModal = (type: string, id: number) => {
    setModalState({ type, isOpen: true, id });
  };

  const closeModal = () => {
    setModalState({ type: "", isOpen: false, id: null });
  };

  const handleSave = async () => {
    if (modalState.id !== null) {
      const updatedRow = { ...data[modalState.id] };
      const id = updatedRow._id;

      let updateData: UpdateData = {};
      if (modalState.type === "call_status" && selectedCallStatus) {
        updateData = { call_status: selectedCallStatus };
      } else if (modalState.type === "remark") {
        updateData = { remark: remark };
      }

      mutation.mutate(
        { id, updateData },
        {
          onSettled: () => {
            closeModal();
          },
        },
      );
    }
  };

  return (
    <div>
      {data && (
        <>
          <Table
            data={data}
            headerMapping={tableHeadersForAppMemberRequests}
            renderCells={(row, index) => ({
              requestedDateTime: formatDateTime(row.purchase_date),
              name: (
                <div>
                  <div>{row?.patient?.name}</div>
                  <div className="text-gray-400">HN:{row?.patient?.hn}</div>
                  <div className="text-gray-400">
                    {calculateAge(row?.patient?.dob)}
                  </div>
                </div>
              ),
              careTaker: (
                <div>
                  <div>{row?.patient?.caretaker}</div>
                  <div className="text-gray-400">
                    {row?.patient?.contact_numbers}
                  </div>
                </div>
              ),
              month: (
                <div>
                  <div>{row.plan?.duration / 30} month</div>
                  <div className="text-gray-400">{row.plan?.price} MMK</div>
                  <div className="text-gray-400">{row.plan?.title}</div>
                </div>
              ),
              membership: row?.patient?.last_purchased_date
                ? "ReNew"
                : "New Member",
              purchaseDate: row?.patient?.last_purchased_date
                ? formatDate(row?.patient?.last_purchased_date)
                : "-",
              expiration_date: row?.patient?.expiration_date
                ? formatDate(row?.patient?.expiration_date)
                : "-",
              callStatus: (
                <Tooltip label="Click to add call status">
                  <div
                    className="text-[20px] text-green-700 cursor-pointer"
                    onClick={() => openModal("call_status", index)}
                  >
                    <FaCheckSquare />
                    <span className="break-words text-[15px]">
                      {row.call_status || ""}
                    </span>
                  </div>
                </Tooltip>
              ),
              remark: (
                <Tooltip label="Click to add remark">
                  <div
                    className="text-[20px] text-green-700 cursor-pointer"
                    onClick={() => openModal("remark", index)}
                  >
                    <FaPenFancy />

                    <span className="break-words text-[15px]">
                      {row.remark || ""}
                    </span>
                  </div>
                </Tooltip>
              ),
              version: row?.patient?.app_user?.app_version || "-",
              action: (
                <div className="flex flex-row gap-5 mx-5">
                  <Tooltip label="Details">
                    <div
                      className="text-[20px] text-green-900 cursor-pointer"
                      onClick={() => {
                        navigate(`/patients/detail/${row?.patient?._id}`);
                      }}
                    >
                      <FaInfoCircle />
                    </div>
                  </Tooltip>
                  <div className="text-[20px] text-red-500 hover:text-red-800 cursor-pointer">
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
                    colSpan={
                      Object.keys(tableHeadersForAppMemberRequests).length
                    }
                  >
                    <div className="flex justify-center">
                      <Loader />
                    </div>
                  </td>
                </tr>
              )
            }
          />

          <Modal
            centered
            title="Call Status"
            isOpen={modalState.isOpen && modalState.type === "call_status"}
            onClose={closeModal}
            renderActionButton={() => (
              <Button onClick={handleSave} disabled={mutation.isPending}>
                {mutation.isPending ? <Loader size="sm" /> : "Save"}
              </Button>
            )}
          >
            <Select
              label="Call Status"
              placeholder="Select a status"
              data={STATUA_VALUE}
              value={selectedCallStatus}
              onChange={(value) => setSelectedCallStatus(value as string)}
            />
          </Modal>

          <Modal
            size={"lg"}
            centered
            isOpen={modalState.isOpen && modalState.type === "remark"}
            onClose={closeModal}
            renderActionButton={() => (
              <Button onClick={handleSave} disabled={mutation.isPending}>
                {mutation.isPending ? <Loader size="sm" /> : "Save"}
              </Button>
            )}
          >
            <div className="text-center font-[18px]">Remark</div>
            <Divider />
            <div>
              <Textarea
                label="Remark"
                autosize
                withAsterisk
                resize="vertical"
                className="my-5 h-full"
                minRows={15}
                style={{ height: "360px" }}
                //classNames={{}}
                value={remark}
                onChange={(event) => setRemark(event.currentTarget.value)}
              />
            </div>
            <Divider />
          </Modal>
        </>
      )}
    </div>
  );
};
