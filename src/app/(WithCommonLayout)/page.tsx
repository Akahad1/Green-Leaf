import CommonPage from "@/components/Home/commonpage/CommonPage";
import HomeProfileInfo from "@/components/Home/HomeProfileInfo/HomeProfileInfo";
import HomeSidebar from "@/components/Home/HomeSiderBar/HomeSideBar";

import { currentUser } from "@/Services/AuthService";
import React from "react";

const page = async () => {
  const user = await currentUser();

  return (
    <div>
      <div className="grid lg:grid-cols-12 gap-5">
        {/* First Div - Spans 4 Columns */}
        <div className="lg:col-span-3 relative lg:mr-10 hidden lg:block">
          <div className="bg-white lg:sticky top-10 rounded-lg shadow-md">
            {/* Image */}
            <HomeProfileInfo userId={user?._id}></HomeProfileInfo>
          </div>
        </div>

        {/* Second Div - Spans 5 Columns */}
        <div className="lg:col-span-9 lg:mr-10  ">
          <CommonPage userId={user?._id}></CommonPage>
        </div>
      </div>
    </div>
  );
};

export default page;
