import { TextInput as MantineTextInput, TextInputProps } from "@mantine/core";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  type?: "email" | "text" | "number";
  label?: ReactNode;
  registration?: Partial<UseFormRegisterReturn>;
  size?: TextInputProps["size"];
  error?: string | boolean;
  withAsterisk?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: string;
} & Pick<
  ComponentProps<"input">,
  | "onChange"
  | "placeholder"
  | "value"
  | "defaultValue"
  | "name"
  | "id"
  | "className"
  | "disabled"
  | "onBlur"
  | "max"
  | "maxLength"
  | "min"
  | "minLength"
  | "readOnly"
  | "onWheel"
>;

export const TextInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      type = "text",
      label,
      placeholder,
      registration,
      size = "md",
      withAsterisk = false,
      error,
      leftIcon,
      rightIcon,
      ...rest
    },
    ref,
  ) => {
    return (
      <MantineTextInput
        classNames={{
          label: "font-semibold text-sm",
        }}
        ref={ref}
        type={type}
        label={label}
        placeholder={placeholder}
        size={size}
        error={error}
        withAsterisk={withAsterisk}
        leftSection={leftIcon}
        rightSection={rightIcon}
        onWheel={(e) => e.currentTarget.blur()}
        {...rest}
        {...registration}
      />
    );
  },
);
