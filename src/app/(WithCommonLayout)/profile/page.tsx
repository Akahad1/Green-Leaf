import ProfileCommonPage from "@/components/ProfilePage/ProfileCommonPage/ProfileCommonPage";
import { currentUser } from "@/Services/AuthService";
import React from "react";

const page = async () => {
  const user = await currentUser();
  return (
    <div>
      <ProfileCommonPage userId={user?._id}></ProfileCommonPage>
    </div>
  );
};

export default page;
