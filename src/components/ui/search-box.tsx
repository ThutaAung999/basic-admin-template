import { ComponentProps } from "react";
import { Icon, TextInput } from "..";
import { useUncontrolled } from "@mantine/hooks";
import { CloseButton } from "@mantine/core";
import { cn } from "@/utils/cn";

type Props = Omit<ComponentProps<typeof TextInput>, "onChange"> & {
  placeholder?: string;
  onChange: (value: string) => void;
  value?: string;
  defaultValue?: string;
};

export const Searchbox = ({
  value,
  defaultValue,
  onChange,
  className,
  ...props
}: Props) => {
  const [_value, setValue] = useUncontrolled<string>({
    value: value ?? "",
    defaultValue: defaultValue ?? "",
    onChange,
  });
  return (
    <TextInput
      {...props}
      leftIcon={<Icon name="magnifier" />}
      className={cn("min-w-[300px]", className)}
      value={_value}
      onChange={(e) => setValue(e.currentTarget.value)}
      rightIcon={_value ? <CloseButton onClick={() => setValue("")} /> : null}
    />
  );
};
