"use client";

import { ProfileCommonPageProps } from "@/components/ProfilePage/ProfileCommonPage/ProfileCommonPage";
import {
  useAddCoverImage,
  useAddProfileImage,
  useGetUser,
} from "@/hooks/user.hook";

import Image from "next/image";
import React from "react";

const HomeProfileInfo: React.FC<ProfileCommonPageProps> = ({ userId }) => {
  const { data: userData, isLoading } = useGetUser(userId);

  if (isLoading) {
    return (
      <span>
        <div className="relative">
          {/* Cover Image Loader */}
          <div className="w-full h-60 bg-gray-300 animate-pulse rounded-t-lg"></div>

          {/* Profile Image Loader */}
          <div className="absolute -bottom-16 left-6 rounded-full border-4 border-white">
            <div className="w-32 h-32 bg-gray-300 animate-pulse rounded-full"></div>
          </div>
        </div>
      </span>
    );
  }

  return (
    <div>
      <div className="relative">
        {/* Cover Image */}
        {userData?.data?.coverImage ? (
          <Image
            src={userData?.data.coverImage} // Default image if user image is not available
            alt="Cover Image"
            width={1200} // You can set the width to a large value
            height={675} // Standard aspect ratio of 16:9 (width:height)
            className="w-full h-auto object-cover rounded-t-lg" // Ensures it scales properly and looks good
          />
        ) : (
          <Image
            src="https://www.shutterstock.com/image-photo/under-constriction-brick-road-rural-600nw-2249870461.jpg"
            alt="Cover Image"
            width={1200}
            height={300}
            className="w-full h-60 object-cover rounded-t-lg"
          />
        )}

        {/* Profile Image */}
        <div className="absolute -bottom-16 left-6 rounded-full border-4 border-white">
          {userData?.data?.image ? (
            <Image
              src={userData?.data.image}
              alt="Profile Image"
              width={80} // Adjust this size based on your layout
              height={80} // Make height the same as width for a circular image
              className="rounded-full object-cover"
            />
          ) : (
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqtktl3g6wWkAzvUAi32yzYgb-jZ0-Pn0sQ&s"
              alt="Profile Image"
              width={80} // Adjust this size based on your layout
              height={80} // Make height the same as width for a circular image
              className="rounded-full object-cover"
            />
          )}
        </div>
      </div>
      <div className="p-6 pt-12 text-center lg:text-left mt-5">
        <div className="lg:flex lg:justify-between lg:items-center">
          <div>
            <h1 className="text-2xl font-semibold">
              {userData?.data.name}
              {userData?.data?.verified === true ? (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-blue-800 w-10 inline"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                </span>
              ) : (
                <></>
              )}
            </h1>

            <div className="flex flex-col  space-y-2  mt-2">
              <div>
                <span className="font-bold">Followers:</span>{" "}
                {userData?.data?.followers.length}
              </div>
              <div>
                <span className="font-bold">Address: </span>
                {userData?.data?.address}
              </div>
              <div>
                <span className="font-bold">Contact:</span>{" "}
                {userData?.data.email}
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4n mb-3">
          <h2 className="text-xl font-bold">Bio</h2>
          <p className="text-gray-700">{userData?.data.details}</p>
        </div>
        {/* <PremiumButton
          email={userData?.data?.email}
          userId={userData?.data?._id}
        ></PremiumButton> */}
      </div>

      {/* Stats and Action Buttons */}
      <div className="p-6 border-t border-gray-200 flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="mt-4">
            <span className="font-bold">Following:</span>{" "}
            {userData?.data?.followed.length}
          </div>
        </div>
        <div>
          {/* <button className="btn btn-primary" onClick={openModal}>
            Edit Profile
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default HomeProfileInfo;
