//import { useGetConsultants } from '../api/get-consultants';
import { useDebouncedCallback, useDisclosure } from "@mantine/hooks";
import {
  //useGetConsultants,
  Consultant,
  useConsultantFilter,
  ConsultantFormModal,
} from "..";

import { useGetConsultants } from "../api/get-consultants";

import { Loader } from "@mantine/core";
import { FaPlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Button, Header, Pagination, Table } from "@/components";
import { useState } from "react";
import { Searchbox } from "@/components/ui/search-box";

const tableHeaders = {
  name: "Name",
  action: "Action",
};

const AddConsultant = () => {
  const [isOpen, { open, close }] = useDisclosure();

  return (
    <div>
      <Button onClick={open} leftIcon={<FaPlus />}>
        Add Consultant
      </Button>
      <ConsultantFormModal isOpen={isOpen} close={close} />
    </div>
  );
};

export const ConsultantList = () => {
  const { onSearch, onPaginate, getAllSearchParams } = useConsultantFilter();
  const { page = 1, limit = 10, search } = getAllSearchParams();

  const [value, setValue] = useState(search);
  const debouncedOnSearch = useDebouncedCallback(onSearch, 500);

  const { data, isLoading } = useGetConsultants({
    limit,
    search,
    skip: (page - 1) * limit,
  });

  const [oldData, setOldData] = useState<Consultant | undefined>();

  const [isOpen, { open, close }] = useDisclosure();

  return (
    <div>
      <Header title="Consultants">
        <Searchbox
          name="search"
          placeholder="Search by Consultant Name"
          value={value}
          onChange={(value) => {
            setValue(value);
            debouncedOnSearch(value);
          }}
        />
      </Header>
      <div className="flex flex-col gap-5 p-7">
        <div className="flex justify-between">
          <AddConsultant />
        </div>
        {isLoading && (
          <div className="flex justify-center">
            <Loader />
          </div>
        )}
        {data?.consultants && (
          <>
            <Table
              data={data?.consultants}
              headerMapping={tableHeaders}
              renderCells={(data) => ({
                name: data.name,
                action: (
                  <Button
                    size="sm"
                    leftIcon={<FaEdit />}
                    onClick={() => {
                      setOldData(data);
                      open();
                    }}
                    className="bg-accent-primary"
                  >
                    Edit
                  </Button>
                ),
              })}
              keyExtract={"name"}
            />
            <Pagination
              value={parseInt(page)}
              total={Math.ceil(data?.count / limit)}
              onChange={onPaginate}
            />
          </>
        )}
      </div>
      <ConsultantFormModal isOpen={isOpen} close={close} oldData={oldData} />
    </div>
  );
};
