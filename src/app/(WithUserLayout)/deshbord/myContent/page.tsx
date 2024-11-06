import MyPost from "@/components/userdeshbord/myPost/MyPost";
import { currentUser } from "@/Services/AuthService";
import React from "react";

const page = async () => {
  const user = await currentUser();
  return (
    <div>
      <MyPost userId={user?._id}></MyPost>
    </div>
  );
};

export default page;
