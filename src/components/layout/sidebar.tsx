import { Link as RouterLink, useLocation } from "react-router-dom";
import { Icon, Link } from "..";
import { childNavItems, motherNavItems, navItems } from "../../constants";
import { Divider } from "@mantine/core";
import { cn } from "../../utils/cn";
import { NavItem } from "../../types";

interface LinkItemProps extends NavItem {
  opened: boolean;
}
const LinkItem = ({
  href,
  text,
  activeIcon,
  inActiveIcon,
  opened,
}: LinkItemProps) => {
  const currentUrl = useLocation().pathname;

  // console.log('href:',href);
  // console.log('activeIcon:', activeIcon);
  // console.log('inActiveIcon:', inActiveIcon);

  // console.log('currentUrl:', currentUrl);
  // console.log('href:', href);

  return (
    <Link
      key={href}
      component={RouterLink}
      to={href}
      className={cn(
        "flex items-center gap-5 px-5 py-2 rounded-lg cursor-pointer hover:no-underline font-medium",
        currentUrl === href && "bg-green-800 text-white",
      )}
    >
      <Icon
        name={currentUrl === href ? activeIcon : inActiveIcon}
        className="min-w-6 min-h-6 max-w-6 max-h-6"
      />
      {opened && currentUrl === href ? (
        <span className="text-white">{text}</span>
      ) : (
        <span className="text-green-600">{text}</span>
      )}
    </Link>
  );
};

export const Sidebar = ({ opened }: { opened: boolean }) => {
  return (
    <>
      <div className="flex flex-col gap-3">
        {navItems.map((props) => (
          <LinkItem key={props.href} {...props} opened={opened} />
        ))}
        <Divider color="gray" />

        <div className="px-3 font-semibold">Child</div>
        {childNavItems.map((props) => (
          <LinkItem key={props.href} {...props} opened={opened} />
        ))}
        <Divider color="gray" />

        <div className="px-1 font-semibold">Mother</div>
        {motherNavItems.map((props) => (
          <LinkItem key={props.href} {...props} opened={opened} />
        ))}
      </div>
    </>
  );
};
