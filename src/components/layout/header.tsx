import { ReactNode } from "react";
import { Title } from "../ui";

export const Header = ({
  title,
  dataCount,
  children,
}: {
  title: string;
  dataCount?: number;
  children?: ReactNode;
}) => {
  return (
    <div className="bg-white shadow-md px-5 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Title order={3}>{title}</Title>
        {dataCount && (
          <span className="bg-primary-500 text-white font-medium px-2 py-1 rounded-md">
            {dataCount}
          </span>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};
