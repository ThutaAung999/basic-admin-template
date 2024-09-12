import { cn } from "@/utils/cn";
import { Dispatch, SetStateAction } from "react";

export type Tab = {
  label: string;
  value: string;
};

type TabsProps = {
  items: Tab[];
  currentTab: Tab;
  setCurrentTab: Dispatch<SetStateAction<Tab>>;
};

export const Tabs = ({ items, currentTab, setCurrentTab }: TabsProps) => {
  return (
    <div className="flex">
      {items.map((item, index) => (
        <div
          key={item.value}
          className={cn(
            "border-solid border-primary-500 py-1 px-5 border-x-0 border-y-2 font-medium cursor-pointer",
            items.length - 1 === index
              ? "border-r-2 rounded-r-md"
              : "border-l-2",
            index === 0 ? "border-l-2 rounded-s-md" : "border-r-2",
            item.value === currentTab.value
              ? "bg-primary-500 text-white"
              : "bg-white text-primary-500",
          )}
          onClick={() => setCurrentTab(item)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};
