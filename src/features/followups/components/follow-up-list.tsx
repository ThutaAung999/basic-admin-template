import { DatePickerInput, ExportButton, Select, Tabs } from "@/components";
import { useState } from "react";
import { Loader } from "@mantine/core";

import { useDebouncedCallback, useDisclosure } from "@mantine/hooks";
import { DatesRangeValue } from "@mantine/dates";
import { FollowUpStatusModal, getFollowUps } from "../child";
import { FollowUp, Tab } from "../types";
import {
  childTabItems,
  motherTabItems,
  status as statusData,
  CHILD_PATIENT_TYPES,
  MOTHER_PATIENT_TYPES,
  useFollowUpFilter,
  HeaderSection,
  TableSection,
} from "..";
import { getMotherFollowUp, MotherFollowUpStatusModal } from "..";
import dayjs from "dayjs";

import { toast } from "@/libs/mantine-toast";

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
  const {
    getAllSearchParams,
    handleChangePatientType,
    handleChangeStatus,

    onSearch,
  } = useFollowUpFilter();

  const { follow_up_type, patient_type, status, search } = getAllSearchParams();

  const [id, setId] = useState("");
  const debouncedOnSearch = useDebouncedCallback(onSearch, 500);

  const [value, setValue] = useState(search);

  const start = date?.[0]?.toISOString() ?? undefined;
  const end = date?.[1]?.toISOString() ?? undefined;

  const [isOpen, { close }] = useDisclosure();

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
    <div>
      {/*  <Header
        title={
          userType === "child" ? "Follow ups(Child)" : "Follow ups(Mother)"
        }
        dataCount={data?.count}
      >
        <div className="flex gap-2">
          <Searchbox
            name="search"
            placeholder={userType === "child" ? "Search by HN" : "Search"}
            value={value}
            onChange={(value) => {
              const trimmedValue = value.trim();
              setValue(trimmedValue);
              debouncedOnSearch(trimmedValue);
            }}
          />
          <Select
            size="md"
            data={statusData}
            onChange={handleChangeStatus}
            defaultValue={status ? status : statusData[0].value}
          />
        </div>
      </Header> */}

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
          <div className="ms-2 flex gap-2 items-center">
            <Select
              data={
                userType === "child"
                  ? CHILD_PATIENT_TYPES
                  : MOTHER_PATIENT_TYPES
              }
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
        </div>
        {isLoading && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}
        {data?.data && (
          <>
            {/*    <Table
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
            )} */}

            <TableSection
              data={data}
              userType={userType}
              setId={setId}
              page={page}
              limit={limit}
            />
          </>
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
