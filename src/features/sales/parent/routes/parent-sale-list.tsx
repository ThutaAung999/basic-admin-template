import { useState } from "react";
import { useGetParentSales } from "../api";
import { useParentSaleFilter } from "..";
import { Header } from "@/components";

import { Loader, Paper } from "@mantine/core";
import { DatesRangeValue } from "@mantine/dates";

import { MotherSaleTable } from "./mother-sale-table";
import { MotherFilterExport } from "./mother-filter-export";
import { MotherHeaderRightPanel } from "./mother-header-right-panel";
import { MotherDeleteModal } from "./mother-delete-modal";

export const ParentSaleList = () => {
  const {
    onPaginate,
    getAllSearchParams,
    onPurchasedDateRangeChange,
    onExpiredDateRangeChange,
    clearDateRangeFilter,
  } = useParentSaleFilter();

  const {
    page = 1,
    limit = 10,
    search,
    membership,
    start,
    end,
    filter_type,
  } = getAllSearchParams();

  const [purchasedDate, setPurchasedDate] = useState<DatesRangeValue>([
    start ? new Date(start) : null,
    end ? new Date(end) : null,
  ]);

  const [expireDate, setExpireDate] = useState<DatesRangeValue>([
    start ? new Date(start) : null,
    end ? new Date(end) : null,
  ]);

  const [isExportEnabled, setIsExportEnabled] = useState(false);

  const [searchValue, setSearchValue] = useState(search);

  const { data, isLoading, refetch } = useGetParentSales({
    limit,
    search,
    membership,
    skip: (page - 1) * limit,
    start,
    end,
    filter_type,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handlePurchasedDatePickerChange = (
    value: DatesRangeValue | Date[] | null,
  ) => {
    if (Array.isArray(value) && value.length === 2 && (value[0] || value[1])) {
      setPurchasedDate([value[0] ?? null, value[1] ?? null]);
      onPurchasedDateRangeChange(value);
      setIsExportEnabled(value[0] !== null && value[1] !== null);
    } else {
      setPurchasedDate([null, null]);
      clearDateRangeFilter();
      setIsExportEnabled(false);
    }
  };

  const handleExpiredDatePickerChange = (
    value: DatesRangeValue | Date[] | null,
  ) => {
    if (Array.isArray(value) && value.length === 2 && (value[0] || value[1])) {
      setExpireDate([value[0] ?? null, value[1] ?? null]);
      onExpiredDateRangeChange(value);
      setIsExportEnabled(value[0] !== null && value[1] !== null);
    } else {
      setExpireDate([null, null]);
      clearDateRangeFilter();
      setIsExportEnabled(false);
    }
  };

  const openDeleteModal = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const hasData = !(data?.data && data.data.length > 0);

  return (
    <div>
      <Header title="Sales(Mother) :" dataCount={data?.count}>
        <MotherHeaderRightPanel
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </Header>

      <Paper withBorder shadow="10">
        <MotherFilterExport
          handlePurchasedDatePickerChange={handlePurchasedDatePickerChange}
          handleExpiredDatePickerChange={handleExpiredDatePickerChange}
          isExportEnabled={isExportEnabled}
          hasData={hasData}
          purchasedDate={purchasedDate}
          expireDate={expireDate}
        />
      </Paper>

      <div className="flex flex-col gap-5 p-7">
        {isLoading && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}

        <MotherSaleTable
          data={data}
          page={page}
          limit={limit}
          onPaginate={onPaginate}
          openDeleteModal={openDeleteModal}
        />
      </div>
      <MotherDeleteModal
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetch={refetch}
        isModalOpen={isModalOpen}
        closeDeleteModal={closeDeleteModal}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};
