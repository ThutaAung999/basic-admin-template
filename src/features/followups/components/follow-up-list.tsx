import { Tabs } from "@/components";
import { useState } from "react";
import { Loader } from "@mantine/core";

import { useDebouncedCallback, useDisclosure } from "@mantine/hooks";
import { DatesRangeValue } from "@mantine/dates";
import { FollowUpStatusModal } from "../child";
import { FollowUp, Tab } from "../types";
import {
  childTabItems,
  motherTabItems,
  status as statusData,
  useFollowUpFilter,
  HeaderSection,
  TableSection,
  RightHeaderSection,
} from "..";
import { MotherFollowUpStatusModal } from "..";

export const FollowUpList = ({
  data,
  isLoading,
  handleChangeDateRange,
  tabHandler,
  page,
  date,
  userType,
  limit,
}: {
  data: { data: FollowUp[]; count: number } | undefined;
  isLoading: boolean;
  handleChangeDateRange: (value: DatesRangeValue | Date[] | null) => void;
  tabHandler: (tab: Tab | ((prevTab: Tab) => Tab)) => void;
  page: string;
  date: DatesRangeValue | Date[] | null;
  userType: string;
  limit: number;
}) => {
  const { getAllSearchParams, handleChangeStatus, onSearch } =
    useFollowUpFilter();

  const { follow_up_type, status, search } = getAllSearchParams();

  const [id, setId] = useState("");
  const debouncedOnSearch = useDebouncedCallback(onSearch, 500);
  const [value, setValue] = useState(search);
  const [isOpen, { close }] = useDisclosure();

   return (
    <div>
      <HeaderSection
        userType={userType}
        data={data}
        value={value}
        setValue={setValue}
        status={status}
        handleChangeStatus={handleChangeStatus}
        debouncedOnSearch={debouncedOnSearch}
        statusData={statusData}
      />

      <div className="flex flex-col gap-8 p-7">
        <div className="flex justify-between">
          <Tabs
            items={userType === "child" ? childTabItems : motherTabItems}
            currentTab={
              userType === "child"
                ? childTabItems.find((tab) => tab.value === follow_up_type) ||
                  childTabItems[0]
                : motherTabItems.find((tab) => tab.value === follow_up_type) ||
                  motherTabItems[0]
            }
            setCurrentTab={tabHandler}
          />

          <RightHeaderSection
            userType={userType}
            search={search}
            handleChangeDateRange={handleChangeDateRange}
            date={date}
          />
        </div>
        {isLoading && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}
        {data?.data && (
          <TableSection
            data={data}
            userType={userType}
            setId={setId}
            page={page}
            limit={limit}
          />
        )}
      </div>
      {userType === "child" ? (
        <FollowUpStatusModal isOpen={isOpen} close={close} id={id} />
      ) : (
        <MotherFollowUpStatusModal isOpen={isOpen} close={close} id={id} />
      )}
    </div>
  );
};
