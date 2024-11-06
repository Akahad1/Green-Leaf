"use client";

import FollowersList from "../Follower/Follower";
import PostCard from "../PostCard/PostCard";
import PostEditorModal from "../PostCreator/PostCreator";
import ProfileImage from "../ProfileImage/ProfileImage";
import ProfileInfo from "../ProfileInfo/ProfileInfo";

export interface ProfileCommonPageProps {
  userId: string; // or whatever type userId should be
}
const ProfileCommonPage: React.FC<ProfileCommonPageProps> = ({ userId }) => {
  return (
    <div>
      <div className="bg-gray-100  pt-10  p-6 mt-[-28px]">
        <div className=" bg-white rounded-lg shadow-md ">
          {/* Cover Image */}
          <ProfileImage userId={userId}></ProfileImage>

          {/* Profile Info */}
          <ProfileInfo userId={userId}></ProfileInfo>
        </div>
      </div>

      <div className="container  lg:grid lg:grid-cols-12 lg:p-10 pt-10  relative w-full  bg-gray-100 ">
        <div className="lg:col-span-5 hidden w-full lg:static lg:flex h-32 top-64 mt-10 left-10 p-6   ml-16">
          <FollowersList userId={userId}></FollowersList>
        </div>
        <div className=" lg:col-span-7 ">
          <div className="lg:mr-10 lg:ml-10 m-5 lg:m-0">
            <PostEditorModal userId={userId}></PostEditorModal>
            <PostCard userId={userId}></PostCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCommonPage;
