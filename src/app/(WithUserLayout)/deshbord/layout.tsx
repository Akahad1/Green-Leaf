import Nabver from "@/components/Shared/Navber/Navber";
import Sidebar from "@/components/Shared/SideBar/SideBar";
import { currentUser } from "@/Services/AuthService";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
const layout = async ({ children }: LayoutProps) => {
  const user = await currentUser();
  return (
    <div className="container mx-auto ">
      <Nabver></Nabver>
      <div className="container mx-auto max-w-7xl pt-10 px-6 flex-grow">
        <Sidebar role={user?.role}>{children}</Sidebar>
      </div>
    </div>
  );
};

export default layout;
