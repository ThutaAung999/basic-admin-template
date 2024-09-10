import { Title as MantineTitle, TitleProps } from "@mantine/core";

type Props = {
  order?: TitleProps["order"];
  className?: string;
  children: React.ReactNode;
};

export const Title = ({ children, ...rest }: Props) => {
  return <MantineTitle {...rest}>{children}</MantineTitle>;
};
