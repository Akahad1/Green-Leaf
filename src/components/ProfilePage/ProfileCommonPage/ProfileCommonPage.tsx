"use client";

import ProfileImage from "../ProfileImage/ProfileImage";

export interface ProfileCommonPageProps {
  userId: string; // or whatever type userId should be
}
const ProfileCommonPage: React.FC<ProfileCommonPageProps> = ({ userId }) => {
  return (
    <div>
      <div className="bg-gray-100   p-4">
        <div className=" bg-white rounded-lg shadow-md ">
          {/* Cover Image */}
          <ProfileImage userId={userId}></ProfileImage>

          {/* Profile Info */}
          {/* <ProfileInfo></ProfileInfo> */}
        </div>
      </div>

      <div className="container  lg:grid lg:grid-cols-12 lg:p-10 pt-10  relative w-full  bg-gray-100 ">
        <div className="lg:col-span-5 hidden w-full lg:static lg:flex h-32 top-64 mt-10 left-10 p-6   ml-16">
          {/* <Follwer></Follwer> */}
          {/* <FollowersList></FollowersList> */}
        </div>
        <div className=" lg:col-span-7 ">
          <div className="lg:mr-10 lg:ml-10 m-5 lg:m-0">
            {/* <PostEditorModal></PostEditorModal>
            <PostCard></PostCard> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCommonPage;
