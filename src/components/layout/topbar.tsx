import { useAuth } from "@/features/auth";
import { Avatar, Menu } from "@mantine/core";
import { FiMenu } from "react-icons/fi";

export const Topbar = ({ toggle }: { toggle: () => void }) => {

  const {user , logout} =useAuth();

  return (
    <div className="bg-gray-200 flex justify-between items-center px-5 h-[60px]">
      <div className="flex items-center gap-5">
        <FiMenu
          className="text-3xl text-green-500 cursor-pointer"
          onClick={toggle}
        />
        <div className="h-[60px] flex justify-center items-center">
          <img
            className="w-full h-full object-cover"
            src="/images/conversation-svgrepo-com.svg"
          />
        </div>
      </div>
      <Menu withArrow>
        <Menu.Target>         
          <div>
            {user && (
              <div className="flex gap-2 items-center text-green cursor-pointer">
                <Avatar size="md" src="/images/default_profile.svg" />
                <div className="flex flex-col">
                  <span>{user?.displayName}</span>
                  <span className="text-xs">{user?.email}</span>
                </div>
              </div>
            )}
          </div>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={logout}>Logout</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};
