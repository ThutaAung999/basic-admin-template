import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="flex justify-center h-screen">
      <div className="w-[50%] p-5 flex flex-col gap-5">
        <Outlet />
      </div>
      <div className="w-[50%] h-full flex items-center justify-center bg-primary-500">
        <img
          className="w-full max-w-[70%] object-cover"
          src="/images/login_cover.png"
        />
      </div>
    </div>
  );
};
