import MyAllFollower from "@/components/userdeshbord/ShowFollower/MyAllFollower";
import { currentUser } from "@/Services/AuthService";
import React from "react";

const page = async () => {
  const user = await currentUser();
  return (
    <div>
      <MyAllFollower userId={user?._id}></MyAllFollower>
    </div>
  );
};

export default page;
