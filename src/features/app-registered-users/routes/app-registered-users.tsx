import { DatesRangeValue } from "@mantine/dates";
import { useRegisteredUsersFilter } from "../hooks";
import { useState } from "react";
import {
  useGetAppRegisteredUsers,
  getAppRegisteredUsers,
} from "../api/get-app-registered-users";

import {
  DeleteModal,
  HeaderRightPanel,
  //RegisteredUsersExportAndFilter,
  RegisteredUsersTable,
} from "../components";
import { Header } from "@/components";
import { Paper, Stack } from "@mantine/core";
import { User } from "../types";
import { toast } from "@/libs/mantine-toast";
import { formatDate } from "@/features/utils";
import { RegisteredUsersExportAndFilter } from "../components/registered-usera-export-and-filter";
import { formatTime, calculateAge } from "../../utils/dateUtils";

export const AppRegisteredUsers = () => {
  const { getAllSearchParams, onRegisteredDateRangeChange } =
    useRegisteredUsersFilter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const {
    page = 1,
    limit = 10,
    search,
    startDate,
    endDate,
    // status = "pending",
  } = getAllSearchParams();

  const [dateValue, setDateValue] = useState<DatesRangeValue>([
    startDate ? new Date(startDate) : null,
    endDate ? new Date(endDate) : null,
  ]);
  const openDeleteModal = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const [searchValue, setSearchValue] = useState(search);

  const { data, isLoading, refetch } = useGetAppRegisteredUsers({
    search,
    startDate,
    endDate,
    limit,
    skip: (page - 1) * limit,
  });

  const handleDatePickerChange = (value: DatesRangeValue | Date[] | null) => {
    if (Array.isArray(value) && value.length === 2) {
      setDateValue([value[0] ?? null, value[1] ?? null]);

      onRegisteredDateRangeChange(value);
      //onDateRangeChange(value);
    } else {
      setDateValue([null, null]);
      onRegisteredDateRangeChange(null);
      //onDateRangeChange(null);
    }
  };

  const getData = async () => {
    try {
      const { data } = await getAppRegisteredUsers({
        search,
        startDate,
        endDate,
        limit: 0,
      });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error({ message: error.message });
      }
    }
  };

  const formatData = (user: User) => ({
    registeredDate: user?.registeredAt ? formatDate(user?.registeredAt) : "-",
    registeredTime: user.registeredAt ? formatTime(user.registeredAt) : "-",
    user_id: user?.user_id,
    name: user?.name ? user?.name : "-",
    age: user?.dob ? calculateAge(user?.dob) : "-",
    phNo: user?.phone_number ? user?.phone_number : "-",
    region: user?.address?.sr?.name ? user?.address?.sr?.name : "-",
    township: user?.address?.township?.name
      ? user?.address?.township?.name
      : "-",
    os: user?.os_platform ? user?.os_platform : "-",
    app_version: user?.app_version ? user?.app_version : "-",
  });
  const isExportEnabled = !startDate || !endDate;

  const hasData = !(data?.data && data.data.length > 0);
  return (
    <div>
      <Header title="App Registered Users:" dataCount={data?.count}>
        <HeaderRightPanel
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </Header>
      <Paper withBorder shadow="10">
        <Stack style={{ overflowX: "auto" }} gap="lg">
          <RegisteredUsersExportAndFilter
            handleDatePickerChange={handleDatePickerChange}
            getData={getData}
            formatData={formatData}
            isExportEnabled={isExportEnabled}
            dateValue={dateValue}
            hasData={hasData}
          />
          <RegisteredUsersTable
            data={data?.data || []}
            isLoading={isLoading}
            page={parseInt(page, 10)}
            limit={limit}
            totalCount={data?.count as number}
            openDeleteModal={openDeleteModal}
          />
        </Stack>
      </Paper>

      <DeleteModal
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
