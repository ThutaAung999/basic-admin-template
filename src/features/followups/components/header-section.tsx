import { Header, Searchbox, Select } from "@/components";

import { FollowUp } from "../types";

interface Props {
  userType: string;
  data:
    | {
        data: FollowUp[];
        count: number;
      }
    | undefined;

  value: string;
  setValue: (value: string) => void;
  status: string | undefined;
  handleChangeStatus: (value: string | null) => void;
  debouncedOnSearch: (value: string) => void;
  statusData: { value: string; label: string }[];
}

export const HeaderSection = ({
  userType,
  data,
  value,
  setValue,
  status,
  handleChangeStatus,
  debouncedOnSearch,
  statusData,
}: Props) => {
  return (
    <>
      <Header
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
      </Header>
    </>
  );
};
