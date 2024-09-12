import { useState } from "react";
import { DatesRangeValue } from "@mantine/dates";


import {useGetMotherFollowUp} from "..";
import {Tab,useFollowUpFilter,FollowUpList} from "../.."


export const ParentFollowupList = () => {



  const today = new Date();
  const aWeek =new Date();
  aWeek.setDate(today.getDate() + 7);

  const {getAllSearchParams, handleChangeTab, onDateRangeChange} =useFollowUpFilter();
  const {
    page = 1,
    limit = 10,
    search,
    status,
    patient_type,
    follow_up_type,
    start,
    end,
  } = getAllSearchParams();



  const [date, setDate] = useState<DatesRangeValue | Date[] | null>([
    start ? new Date(start) : today,
    end ? new Date(end) : aWeek,
  ]);


const{data , isLoading }=useGetMotherFollowUp({
  limit,
  skip: (page-1)* limit,
  search,
  follow_up_type: follow_up_type?? "SCHEDULED",
  start: date?.[0]?.toISOString()?? undefined,
  end: date?.[1]?.toISOString()?? undefined,
  status:status??"pending",
  patient_type,
  sort: "follow_up_date",

})

const handleChangeDateRange = (value: DatesRangeValue | Date[] | null) => {
  setDate(value);
  onDateRangeChange(value);
};


const tabHandler = (tab: Tab | ((prevTab: Tab) => Tab)) => {
  if (typeof tab === "function") {
    const newTab = tab({ label: "", value: "" });
    handleChangeTab(newTab.value);
  } else {
    handleChangeTab(tab.value);
  }
};

return (
  <FollowUpList
    data={data}
    isLoading={isLoading}
    handleChangeDateRange={handleChangeDateRange}
    tabHandler={tabHandler}
    page={page}
    date={date}
    limit={limit}
    userType="mother"
  ></FollowUpList>
);
};
