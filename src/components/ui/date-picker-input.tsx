import {
  DatePickerProps,
  DatesRangeValue,
  DatePickerInput as MantineDatePickerInput,
} from "@mantine/dates";
import { Icon } from "..";
import { ReactNode } from "react";
import clsx from "clsx";

type DateTypeProps =
  | {
      type?: "range";
      onChange?: (value: Date[] | DatesRangeValue | null) => void;
      value?: Date[] | DatesRangeValue | null;
    }
  | {
      type?: "default";
      onChange?: (value: Date | null) => void;
      value?: Date | null;
    };

type Props = DateTypeProps & {
  placeholder?: string;
  label?: ReactNode;
  className?: string;
  size?: DatePickerProps["size"];
  error?: string | boolean;
  minDate?: Date;
  maxDate?: Date;
  withAsterisk?: boolean;
  defaultDate?: Date;
};

export const DatePickerInput = ({
  placeholder = "Pick a date",
  size = "md",
  ...props
}: Props) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <MantineDatePickerInput
      classNames={{
        label: "font-semibold text-sm",
        day: clsx(
          "data-[today]:border data-[today]:border-brand-primary data-[today]:border-solid",
        ),
      }}
      leftSection={<Icon name="calendar" />}
      leftSectionPointerEvents="none"
      placeholder={placeholder}
      numberOfColumns={props.type === "range" ? 2 : 1}
      allowSingleDateInRange
      size={size}
      clearable
      {...props}
    />
  );
};
