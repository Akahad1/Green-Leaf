import ShowFollowing from "@/components/userdeshbord/ShowFollowing/ShowFollowing";
import { currentUser } from "@/Services/AuthService";
import React from "react";

const page = async () => {
  const user = await currentUser();
  return (
    <div>
      <ShowFollowing userId={user?._id}></ShowFollowing>
    </div>
  );
};

export default page;
