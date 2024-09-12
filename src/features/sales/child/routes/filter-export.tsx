import { DatePickerInput, ExportButton } from "@/components";
import { DatesRangeValue } from "@mantine/dates";
import { Purchase } from "../types";

import { getChildSales } from "..";
import { useChildSaleFilter } from "../hook/useChildSaleFilter";
import { toast } from "@/libs/mantine-toast";
import { formatDateTime } from "@/features/utils";

type Props = {
  handlePurchasedDatePickerChange: (
    value: DatesRangeValue | Date[] | null,
  ) => void;
  handleExpiredDatePickerChange: (
    value: DatesRangeValue | Date[] | null,
  ) => void;

  isExportEnabled: boolean;
  hasData: boolean;
  purchasedDate: DatesRangeValue;
  expireDate: DatesRangeValue;
};

export const FilterExport = ({
  handlePurchasedDatePickerChange,
  handleExpiredDatePickerChange,

  isExportEnabled,
  purchasedDate,
  expireDate,
  hasData,
}: Props) => {
  const { getAllSearchParams } = useChildSaleFilter();

  const { search, start, end, filter_type } = getAllSearchParams();

  const getData = async () => {
    try {
      const { data } = await getChildSales({
        search,
        filter_type,
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

  const formatData = (item: Purchase) => ({
    patient: item.customer?.name,
    careTaker: item?.customer?.caretaker,
    type: item.customer_type ? item.customer_type : "-",
    purchase_date: item.purchase_date
      ? formatDateTime(item.purchase_date)
      : "-",
    expiration_date: item.expiration_date
      ? formatDateTime(item.expiration_date)
      : "-",
    duration: item.duration ? item.duration : "-",
    amount: item.amount ? item.amount : "-",
    payment_method: item.payment_provider ? item.payment_provider : "-",
    remark: item.remark ? item.remark : "-",
    membership: item.is_extension ? "EXTENSION" : "NEW MEMBER",
    location: item?.customer?.address?.township?.name,
  });

  return (
    <div className="flex justify-end items-center my-5 gap-2 me-10">
      <ExportButton
        getData={getData}
        format={formatData}
        className=" text-green-900 "
        filename="child_call_log_export.csv"
        disabled={!isExportEnabled || hasData}
      />

      <DatePickerInput
        type="range"
        value={purchasedDate}
        onChange={handlePurchasedDatePickerChange}
        placeholder="Filter by purchase date..."
      />

      <DatePickerInput
        type="range"
        value={expireDate}
        onChange={handleExpiredDatePickerChange}
        placeholder="Filter by Expired date..."
      />
    </div>
  );
};
