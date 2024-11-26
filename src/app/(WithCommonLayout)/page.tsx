import CommonPage from "@/components/Home/commonpage/CommonPage";
import { currentUser } from "@/Services/AuthService";
import React from "react";

const page = async () => {
  const user = await currentUser();

  return (
    <div>
      <CommonPage userId={user?._id}></CommonPage>
    </div>
  );
};

export default page;
