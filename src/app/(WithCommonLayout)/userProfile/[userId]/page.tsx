import UserProfilePages from "@/components/userProfileComponent/UserProfilePages/UserProfilePages";
import React from "react";

interface Params {
  params: {
    userId: string;
  };
}

const pages: React.FC<Params> = async ({ params }) => {
  const { userId } = await params;
  return (
    <div>
      <UserProfilePages UserId={userId}></UserProfilePages>
    </div>
  );
};

export default pages;
