import { Searchbox, Select } from "@/components";

import { MEMBERSHIP_TYPES } from "../types";
import { useChildSaleFilter } from "../hook/useChildSaleFilter";
import { useDebouncedCallback } from "@mantine/hooks";
type Props = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export const HeaderRightPanel = ({ searchValue, setSearchValue }: Props) => {
  const { handleMembershipChange, onSearch } = useChildSaleFilter();
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
