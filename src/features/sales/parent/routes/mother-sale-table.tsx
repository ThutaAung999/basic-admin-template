import { Pagination } from "@/components";
import { Table } from "@/components";
import { FaTrash } from "react-icons/fa6";
import { Purchase } from "../types";
import { formatDateTime } from "@/features/utils";

type Props = {
  data:
    | {
        data: Purchase[];
        count: number;
      }
    | undefined;
  page: string;
  limit: number;
  onPaginate: (page: number) => void;
  openDeleteModal: (id: string) => void;
};

const tableHeaders = {
  patient: "Patient",
  careTaker: "Care Taker",
  type: "type",
  purchase_date: "Purchase  Date",
  expiration_date: "Expiration Date",
  duration: "Duration(Days)",
  amount: "Amount",
  payment_method: "Payment Method",
  remark: "Remark",
  membership: "Membership",
  location: "Location",
  action: "Action",
};

export const MotherSaleTable = ({
  data,
  page,
  limit,
  onPaginate,
  openDeleteModal,
}: Props) => {
  return (
    <>
      {data?.data && (
        <>
          <div className="mx-3">
            <Table
              noDataMessage="No data available"
              data={data.data || []}
              headerMapping={tableHeaders}
              renderCells={(data) => ({
                patient: (
                  <div>
                    <div>{data?.customer?.name}</div>
                    <div className="text-gray-400 text-[12px]">
                      {data?.customer?.patient_number}
                    </div>
                  </div>
                ),
                careTaker: (
                  <div>
                    <div>{data?.customer?.caretaker}</div>
                    <div className="text-gray-400 text-[12px]">
                      {data?.customer?.contact_numbers}
                    </div>
                  </div>
                ),
                type: data.customer_type ? data.customer_type : "-",
                purchase_date: data.purchase_date
                  ? formatDateTime(data.purchase_date)
                  : "-",
                expiration_date: data.expiration_date
                  ? formatDateTime(data.expiration_date)
                  : "-",
                duration: data.duration ? data.duration : "-",
                amount: data.amount ? data.amount : "-",
                payment_method: data.payment_provider
                  ? data.payment_provider
                  : "-",
                remark: data.remark ? data.remark : "-",
                membership: data.is_extension ? "EXTENSION" : "NEW MEMBER",
                location: data?.customer?.address?.township?.name,
                action: (
                  <div
                    className="text-[20px] text-red-500 hover:text-red-800 cursor-pointer"
                    onClick={() => openDeleteModal(data._id)}
                  >
                    <FaTrash />
                  </div>
                ),
              })}
              keyExtract={"_id"}
            />
            <div className="my-5 border border-separate">
              <Pagination
                value={parseInt(page)}
                total={Math.ceil(data?.count / limit)}
                onChange={onPaginate}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
