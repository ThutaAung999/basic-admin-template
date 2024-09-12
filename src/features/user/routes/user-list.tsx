import {
  ExportButton,
  Header,
  Pagination,
  Searchbox,
  Table,
} from "@/components";

import { getUsers, useGetUsers } from "..";
import { Loader } from "@mantine/core";
import { toast } from "@/libs/mantine-toast";
import { Users } from "..";

//import { useBaseFilter } from "@/hooks";
import { useUsersFilter } from "..";
import { useState } from "react";
import { useDebouncedCallback } from "@mantine/hooks";

export const UserList = () => {
  const { onPaginate, onSearch, getAllSearchParams } = useUsersFilter();
  const { page = 1, limit = 10, search } = getAllSearchParams();
  const [searchValue, setSearchValue] = useState(search);
  const debounceOnSearch = useDebouncedCallback(onSearch, 500);

  const { data: users, isLoading } = useGetUsers({
    limit,
    search,
    skip: (page - 1) * limit,
  });

  const getData = async () => {
    try {
      const { data } = await getUsers({
        search,
        limit: 0,
      });
      return data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error({ message: error.message });
      }
    }
  };

  const formatData = (user: Users) => {
    return { Name: user?.name, Email: user?.email };
  };

  return (
    <div>
      <Header title="Users">
        <Searchbox
          name="search"
          placeholder="Search"
          value={searchValue}
          onChange={(value) => {
            setSearchValue(value);
            debounceOnSearch(value);
          }}
        />
      </Header>
      <div className="flex flex-col gap-4 p-7">
        <div className="flex justify-end ">
          <ExportButton
            getData={getData}
            format={formatData}
            filename="Users"
            className="hover:text-gray-400"
          />
        </div>

        {isLoading && (
          <div className="flex justify-center mt-4">
            <Loader />
          </div>
        )}

        {users && (
          <>
            <Table
              headerMapping={{ name: "Name" }}
              data={users?.data}
              renderCells={(data) => ({
                name: data?.name,
              })}
              keyExtract={"_id"}
            />
            {users?.count > 10 && (
              <Pagination
                value={parseInt(page)}
                total={Math.ceil(users?.count / limit)}
                onChange={onPaginate}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
