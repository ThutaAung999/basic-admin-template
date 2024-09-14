import { Searchbox } from "@/components";

import { useDebouncedCallback } from "@mantine/hooks";
import { useRegisteredUsersFilter } from "../hooks";
type Props = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export const HeaderRightPanel = ({ searchValue, setSearchValue }: Props) => {
  const { onSearch } = useRegisteredUsersFilter();
  const debouncedOnSearch = useDebouncedCallback(onSearch, 500);

  return (
    <Searchbox
      name="search"
      placeholder="Search User Id , Name or PhNo"
      value={searchValue}
      onChange={(value) => {
        setSearchValue(value);
        debouncedOnSearch(value);
      }}
    />
  );
};
