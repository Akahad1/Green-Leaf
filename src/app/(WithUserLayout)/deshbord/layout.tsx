import Sidebar from "@/components/Shared/SideBar/SideBar";
import { currentUser } from "@/Services/AuthService";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
const layout = async ({ children }: LayoutProps) => {
  const user = await currentUser();
  return (
    <div className=" ">
      <div className="">
        <Sidebar user={user}>{children}</Sidebar>
      </div>
    </div>
  );
};

export default layout;
