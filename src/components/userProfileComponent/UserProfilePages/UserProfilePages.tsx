"use client";
import React from "react";
import UserProfileImage from "../UserProfileImage/UserProfileImage";
import UserProfileInfo from "../UserProfileInfo/UserProfileInfo";
import UserPostCard from "../UserPostCard/UserPostCard";

interface UserProfilePagesProps {
  UserId: string;
}

const UserProfilePages: React.FC<UserProfilePagesProps> = ({ UserId }) => {
  return (
    <div>
      {" "}
      <div className="lg:bg-gray-100  p-10 pt-8 mt-[-16px]">
        <div className="container mx-auto bg-white rounded-lg shadow-md">
          {/* ProfileImage */}

          <UserProfileImage UserId={UserId}></UserProfileImage>

          {/* Profile Info */}

          <UserProfileInfo UserId={UserId}></UserProfileInfo>
        </div>
      </div>
      <div className="container mx-auto  lg:p-10 pt-10  relative w-full  lg:bg-gray-100 ">
        <div className="lg:mr-10 flex justify-center">
          {/* <PostEditor></PostEditor> */}
          <UserPostCard UserId={UserId}></UserPostCard>
          {/* <PostCard></PostCard> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePages;
