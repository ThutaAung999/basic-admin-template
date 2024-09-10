import { Checkbox as MantineCheckbox } from "@mantine/core";
import { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label?: string;
  labelPosition?: "left" | "right";
  error?: string | boolean;
  registration?: Partial<UseFormRegisterReturn>;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  value?: string;
};

const Checkbox = ({
  label = "",
  error = "",
  labelPosition = "right",
  registration,
  ...rest
}: Props) => {
  return (
    <MantineCheckbox
      style={{ cursor: "pointer" }}
      radius="sm"
      label={label}
      error={error}
      labelPosition={labelPosition}
      {...rest}
      {...registration}
    />
  );
};

Checkbox.Group = MantineCheckbox.Group;

export { Checkbox };
