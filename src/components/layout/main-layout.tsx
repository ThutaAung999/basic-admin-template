import { AppShell, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Topbar } from "./topbar";
import { Sidebar } from "./sidebar";
import { Outlet } from "react-router-dom";
import { Protected } from "@/features/auth";

export function MainLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Protected>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: opened ? 300 : 72,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Topbar toggle={toggle} />
        </AppShell.Header>

        <AppShell.Navbar className="-z-0 py-3 px-1">
          <ScrollArea type="never">
            <Sidebar opened={opened} />
          </ScrollArea>
        </AppShell.Navbar>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </Protected>
  );
}
