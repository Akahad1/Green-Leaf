import CommonPage from "@/components/Home/commonpage/CommonPage";
import HomeProfileInfo from "@/components/Home/HomeProfileInfo/HomeProfileInfo";
import { currentUser } from "@/Services/AuthService";
import React from "react";

const page = async () => {
  const user = await currentUser();

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12  gap-6">
        {/* First Div - Sidebar on Large Screens */}
        <div className="lg:col-span-3 hidden lg:block relative ">
          <div className="bg-white lg:sticky top-20 rounded-lg shadow-md">
            {/* Profile Info */}
            <HomeProfileInfo userId={user?._id}></HomeProfileInfo>
          </div>
        </div>

        {/* Second Div - Main Content */}
        <div className="col-span-1  lg:col-span-9 mr-2 ml-2">
          <CommonPage userId={user?._id}></CommonPage>
        </div>
      </div>
    </div>
  );
};

export default page;
