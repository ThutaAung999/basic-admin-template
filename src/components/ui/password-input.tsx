import { ComponentProps, forwardRef } from "react";
import { PasswordInput as MantinePasswordInput } from "@mantine/core";
import { TextInput } from "..";

type Props = Omit<ComponentProps<typeof TextInput>, "type">;

export const PasswordInput = forwardRef<HTMLInputElement, Props>(
  ({ registration, size = "md", ...rest }, ref) => {
    return (
      <MantinePasswordInput
        classNames={{
          label: "text-sm font-semibold",
        }}
        ref={ref}
        size={size}
        {...rest}
        {...registration}
      />
    );
  },
);
