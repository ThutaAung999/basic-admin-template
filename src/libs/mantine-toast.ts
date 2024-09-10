import { ReactNode } from "react";
import { notifications } from "@mantine/notifications";
import { NotificationProps } from "@mantine/core";

type Options = {
  title?: string;
  message: ReactNode;
  className?: string;
  loading?: boolean;
  color?: string;
  onOpen?: () => void;
  onClose?: () => void;
  autoCloseAfter?: number;
  withCloseButton?: boolean;
  id?: string;
  icon?: NotificationProps["icon"];
  position?: string;
};

const defaultOpts: Partial<Options> = {
  withCloseButton: true,
  position: "top",
};

export const toast = {
  show(opt: Options) {
    notifications.show({ ...opt, ...defaultOpts });
  },
  success(opt: Options) {
    this.show({
      color: "green",
      ...opt,
    });
  },

  error(opt: Options) {
    this.show({
      color: "red",
      ...opt,
    });
  },
};
