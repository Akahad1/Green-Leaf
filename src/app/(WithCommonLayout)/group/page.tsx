import CreateGroup from "@/components/Groups/CreateGroup/CreateGroup";
import GroupsProfile from "@/components/Groups/GroupsProfile/GroupsProfile";
import { currentUser } from "@/Services/AuthService";
import React from "react";

const page = async () => {
  const user = await currentUser();
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-12 lg:gap-5">
      <div className="lg:col-span-4">
        <CreateGroup userId={user?._id}></CreateGroup>
      </div>
      <div className="lg:col-span-8 hidden lg:inline ">
        <GroupsProfile></GroupsProfile>
      </div>
    </div>
  );
};

export default page;
