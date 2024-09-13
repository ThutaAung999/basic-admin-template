import { useEffect, useState } from "react";
import { Header, Searchbox, Select } from "@/components";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "@mantine/hooks";

import { MOTHER_PATIENT_TYPES, MEMBER_TYPES } from "@/features/sharedConstants";

import { useBaseFilter } from "@/hooks";
import { Tabs } from "@mantine/core";
import {
  MotherExistingMembersRightPanel,
  MotherExistingMembersRoute,
} from "./mother-existing-members";
import {
  MotherRegisteredUsersRoute,
  MotherRegisteredUsersRouteRightPanel,
} from "./mother-registered-users";
import {
  MotherAppMemberRequestsRightPanel,
  MotherAppMemberRequestsRoute,
} from "./mother-app-member-requests";

export const ParentPatientList = () => {
  const { tab = "registered-users" } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const [searchValue, setSearchValue] = useState<string | null>(search);

  const { onSearch } = useBaseFilter();
  const debouncedOnSearch = useDebouncedCallback(onSearch, 500);

  const patientType = searchParams.get("last_customer_type") || undefined;
  const appMemberType = searchParams.get("member_type") || undefined;

  useEffect(() => {
    setSearchValue("");
  }, [tab]);

  const onTabChange = (value: string) => {
    navigate(`/mothers/patients/${value}`);
  };

  const onPatientTypeChange = (value: string | null) => {
    if (value && value !== "All") {
      searchParams.set("last_customer_type", value);
    } else {
      searchParams.delete("last_customer_type");
    }
    searchParams.delete("page");

    setSearchParams(searchParams);
  };

  const onMemberTypeChange = (value: string | null) => {
    if (value) {
      searchParams.set("member_type", value);
    } else {
      searchParams.delete("member_type");
    }
    searchParams.delete("page");

    setSearchParams(searchParams);
  };

  return (
    <div>
      <Header title="Registered Patients (Mother)">
        <div className="flex flex-col sm:flex-row gap-2 mx-3">
          <Select
            className={tab === "app-member-requests" ? "" : "hidden"}
            clearable
            placeholder="Select Member type..."
            data={MEMBER_TYPES}
            value={appMemberType || null}
            onChange={onMemberTypeChange}
            size="md"
          />
          <Select
            className={tab !== "app-member-requests" ? "" : "hidden"}
            placeholder="Select patient type..."
            data={MOTHER_PATIENT_TYPES}
            value={patientType || null}
            onChange={onPatientTypeChange}
            size="md"
          />
          <Searchbox
            name="search"
            placeholder="Search by HN, Phno or Name"
            value={searchValue ?? ""}
            onChange={(value) => {
              setSearchValue(value);
              debouncedOnSearch(value);
            }}
            className="w-full sm:w-auto"
          />
        </div>
      </Header>

      <div className="p-4">
        <Tabs
          keepMounted={false}
          classNames={{
            list: "before:border-none",
            tab: "font-medium h-[42px] border-y-2 border-r-2 border-primary-primary border-collapse rounded-none first:border-2 first:rounded-l-md last:rounded-r-md data-[active=true]:bg-primary-primary data-[active=true]:text-white hover:border-primary-primary",
          }}
          defaultValue="registered-users"
          value={tab}
          onChange={(value) => {
            onTabChange(value || "registered-users");
          }}
        >
          <div className="flex justify-between items-center">
            <Tabs.List>
              <Tabs.Tab value="registered-users">Registered Users</Tabs.Tab>
              <Tabs.Tab value="existing-members">Existing Members</Tabs.Tab>
              <Tabs.Tab value="app-member-requests">
                App Member Requests
              </Tabs.Tab>
            </Tabs.List>

            {/* Mother Right Side Panels */}
            <div>
              <Tabs.Panel value="registered-users">
                <MotherRegisteredUsersRouteRightPanel />
              </Tabs.Panel>
              <Tabs.Panel value="existing-members">
                <MotherExistingMembersRightPanel />
              </Tabs.Panel>
              <Tabs.Panel value="app-member-requests">
                <MotherAppMemberRequestsRightPanel />
              </Tabs.Panel>
            </div>
          </div>

          {/*Mother Main Panels */}
          <div className="mt-4">
            <Tabs.Panel value="registered-users">
              <MotherRegisteredUsersRoute />
            </Tabs.Panel>
            <Tabs.Panel value="existing-members">
              <MotherExistingMembersRoute />
            </Tabs.Panel>
            <Tabs.Panel value="app-member-requests">
              <MotherAppMemberRequestsRoute />
            </Tabs.Panel>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
