import { Searchbox, Select } from "@/components";

import { MEMBERSHIP_TYPES } from "../types";

import { useDebouncedCallback } from "@mantine/hooks";
import { useParentSaleFilter } from "../hook/useParentSaleFilter";
type Props = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export const MotherHeaderRightPanel = ({
  searchValue,
  setSearchValue,
}: Props) => {
  const { handleMembershipChange, onSearch } = useParentSaleFilter();
  const debouncedOnSearch = useDebouncedCallback(onSearch, 500);

  return (
    <div className="flex flex-row mx-5 gap-3">
      <Select
        placeholder="Select membership..."
        data={MEMBERSHIP_TYPES}
        onChange={handleMembershipChange}
      />
      <Searchbox
        name="search"
        placeholder="Search HR NO or Name"
        value={searchValue}
        onChange={(value) => {
          setSearchValue(value);
          debouncedOnSearch(value);
        }}
      />
    </div>
  );
};
