import { Link as RouterLink, useLocation } from "react-router-dom";
import { Icon, Link } from "../ui";
import {
  appManagement,
  childNavItems,
  motherNavItems,
  navItems,
} from "@/constants";
import { Divider } from "@mantine/core";
import { cn } from "@/utils/cn";
import { NavItem } from "@/types";

const LinkItem = ({ href, text, activeIcon, inActiveIcon }: NavItem) => {
  const currentUrl = useLocation().pathname;

  return (
    <Link
      key={href}
      component={RouterLink}
      to={href}
      className={cn(
        "flex items-center gap-5 px-5 py-2 rounded-lg cursor-pointer hover:no-underline font-medium",
        currentUrl === href && "bg-primary-500 text-white",
      )}
    >
      <Icon
        name={currentUrl === href ? activeIcon : inActiveIcon}
        className="min-w-6 min-h-6 max-w-6 max-h-6"
      />
      <span>{text}</span>
    </Link>
  );
};

export const Sidebar = () => {
  return (
    <div className="flex flex-col gap-3">
      {navItems.map((props) => (
        <LinkItem key={props.href} {...props} />
      ))}
      <Divider color="gray" />

      <div className="px-3 font-semibold">Child</div>
      {childNavItems.map((props) => (
        <LinkItem key={props.href} {...props} />
      ))}
      <Divider color="gray" />

      <div className="px-1 font-semibold">Mother</div>
      {motherNavItems.map((props) => (
        <LinkItem key={props.href} {...props} />
      ))}

      <Divider color="gray" />

      <div className="px-1 font-semibold">App Management</div>
      {appManagement.map((props) => (
        <LinkItem key={props.href} {...props} />
      ))}
    </div>
  );
};
