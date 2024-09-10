import { IconName } from "../components";

export type NavItem = {
  href: string;
  text: string;
  activeIcon: IconName;
  inActiveIcon: IconName;
  type?: string;
};
