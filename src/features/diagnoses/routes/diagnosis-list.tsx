import {
  ExportButton,
  Header,
  Pagination,
  Searchbox,
  Table,
} from "@/components";

import {
  Diagnosis,
  getChildDiagnoses,
  getMotherDiagnoses,
  useGetChildDiagnoses,
  useGetMotherDiagnoses,
} from "@/features/patients";

//import {  getChildDiagnoses} from '../../patients/child/api/get-child-diagnoses'

import { useEffect, useState } from "react";
import { Loader, Tabs } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useDebouncedCallback } from "@mantine/hooks";
import { toast } from "@/libs/mantine-toast";
//import { useDiagnosisFilter } from "../hooks";

import { useBaseFilter } from "@/hooks";
export const DiagnosisList = () => {
  const { tab = "child" } = useParams();

  const navigate = useNavigate();

  const onTabChange = (value: string) => {
    navigate(`/diagnoses/${value}`);
  };

  const { onPaginate, onSearch, getAllSearchParams } = useBaseFilter();

  const { page = 1, limit = 10, search } = getAllSearchParams();

  const [searchValue, setSearchValue] = useState(search);

  const debounceOnSearch = useDebouncedCallback(onSearch, 500);

  useEffect(() => {
    setSearchValue("");
  }, [tab]);

  const { data: diagnoses, isLoading: isGettingChildDiagnoses } =
    useGetChildDiagnoses({
      type: "new",
      limit,
      search,
      skip: (page - 1) * limit,
    });

  const { data: motherDiagnoses, isLoading: isGettingMotherDiagnoses } =
    useGetMotherDiagnoses({
      type: "new",
      limit,
      search,
      skip: (page - 1) * limit,
    });

  const getData = async () => {
    if (tab === "child") {
      try {
        const { data } = await getChildDiagnoses({
          search,
          limit: 0,
          type: "new",
        });
        return data;
      } catch (error) {
        if (error instanceof Error) {
          toast.error({ message: error.message });
        }
      }
    } else if (tab === "mother") {
      try {
        const { data } = await getMotherDiagnoses({
          search,
          limit: 0,
          type: "new",
        });
        return data;
      } catch (error) {
        if (error instanceof Error) {
          toast.error({ message: error.message });
        }
      }
    }
  };

  const formatData = (diagnosis: Diagnosis) => {
    return { Name: diagnosis?.name };
  };
  return (
    <div>
      <Header title={tab === "child" ? "Child Diagnoses" : "Mother Diagnoses"}>
        <Searchbox
          name="Search"
          placeholder="Search"
          value={searchValue}
          onChange={(value: string) => {
            const trimmedValue = value.trim();
            setSearchValue(trimmedValue);
            debounceOnSearch(trimmedValue);
          }}
        />
      </Header>
      <div className="flex flex-col gap-8 p-7">
        <div>
          <Tabs
            classNames={{
              list: "before:border-none",
              tab: "font-medium h-[42px] border-y-2 border-r-2 border-primary-primary border-collapse rounded-none first:border-2 first:rounded-l-md last:rounded-r-md data-[active=true]:bg-primary-primary text-primary-primary data-[active=true]:text-white hover:border-primary-primary",
            }}
            defaultValue="child"
            value={tab}
            onChange={(value) => {
              onTabChange(value || "child");
            }}
          >
            <Tabs.List className="mb-4">
              <Tabs.Tab value="child">CHILD</Tabs.Tab>
              <Tabs.Tab value="mother">MATERNAL</Tabs.Tab>
            </Tabs.List>
            <ExportButton
              getData={getData}
              format={formatData}
              className="mb-4 hover:text-black"
              filename={
                tab === "child" ? "child_Diagnoses" : "mother_Diagnoses"
              }
            />

            <Tabs.Panel value="child">
              {isGettingChildDiagnoses && (
                <div className="flex justify-center mt-2">
                  <Loader />
                </div>
              )}
              {diagnoses && (
                <>
                  <Table
                    headerMapping={{ name: "Name" }}
                    data={diagnoses?.data}
                    renderCells={(data) => ({
                      name: data?.name,
                    })}
                    keyExtract={"_id"}
                  />
                  {diagnoses?.count > 10 && (
                    <div className="mt-6">
                      <Pagination
                        value={parseInt(page)}
                        total={Math.ceil(diagnoses?.count / limit)}
                        onChange={onPaginate}
                      />
                    </div>
                  )}
                </>
              )}
              ||[];
            </Tabs.Panel>
            <Tabs.Panel value="mother">
              {isGettingMotherDiagnoses && (
                <div className="flex justify-center mt-2">
                  <Loader />
                </div>
              )}
              {motherDiagnoses && (
                <>
                  <Table
                    headerMapping={{ name: "Name" }}
                    data={motherDiagnoses?.data}
                    renderCells={(data) => ({
                      name: data?.name,
                    })}
                    keyExtract={"_id"}
                  />
                  <div className="mt-6">
                    {motherDiagnoses?.count > 10 && (
                      <Pagination
                        value={parseInt(page)}
                        total={Math.ceil(motherDiagnoses?.count / limit)}
                        onChange={onPaginate}
                      />
                    )}
                    ||[];
                  </div>
                </>
              )}
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
