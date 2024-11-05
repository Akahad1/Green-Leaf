"use client";

import { useGetUser } from "@/hooks/user.hook";

import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import { ProfileCommonPageProps } from "../ProfileCommonPage/ProfileCommonPage";

const ProfileImage: React.FC<ProfileCommonPageProps> = ({ userId }) => {
  const { data: userData, isLoading } = useGetUser(userId);

  //   const [addProfile] = useUpdateUserImagesMutation();
  //   const [updateCoverImage] = useUpdateCoverImageMutation();

  // Handle profile image upload
  console.log("userId", userId);
  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImage(file); // Upload profile image
    }
  };

  // Handle cover image upload
  const handleCoverImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadCoverImage(file); // Upload cover image
    }
  };

  // Upload function (common for both images)
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    // formData.append("type", type); // Add the type to differentiate profile and cover image
    console.log(formData);
    console.log("ids", userId);
    const profileInfo = {
      user: userId,
      data: formData,
    };
    console.log(profileInfo);
    const tostID = toast.loading("Update Images...");
    // try {
    //   const res = await addProfile(profileInfo);
    //   if (res.error) {
    //     toast.error("Something went wrong", { id: tostID });
    //   } else {
    //     toast.success(" Images Upload successfully", { id: tostID });
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };
  const uploadCoverImage = async (file: File) => {
    const formData = new FormData();
    formData.append("cover", file);
    // formData.append("type", type); // Add the type to differentiate profile and cover image
    console.log(formData);
    console.log("ids", userId);
    const profileInfo = {
      user: userId,
      data: formData,
    };
    console.log(profileInfo);
    const tostID = toast.loading("Update Images...");
    // try {
    //   const res = await updateCoverImage(profileInfo);
    //   if (res.error) {
    //     toast.error("Something went wrong", { id: tostID });
    //   } else {
    //     toast.success("update CoverImage successfully", { id: tostID });
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

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
            src={userData?.data.coverImage}
            alt="Cover Image"
            width={1200}
            height={300}
            className="w-full h-60 object-cover rounded-t-lg"
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

        {/* Cover Image Upload Plus Icon */}
        <label
          htmlFor="cover-input"
          className="absolute top-4 right-4 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </label>

        {/* Hidden Cover Image Input */}
        <input
          id="cover-input"
          type="file"
          accept="image/*"
          onChange={handleCoverImageChange}
          className="hidden"
        />

        {/* Profile Image */}
        <div className="absolute -bottom-16 left-6 rounded-full border-4 border-white">
          {userData?.data?.image ? (
            <Image
              src={userData?.data.image}
              alt="Profile Image"
              width={128}
              height={100}
              className="rounded-full"
            />
          ) : (
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqtktl3g6wWkAzvUAi32yzYgb-jZ0-Pn0sQ&s"
              alt="Profile Image"
              width={128}
              height={128}
              className="rounded-full"
            />
          )}
        </div>

        {/* Profile Image Upload Plus Icon */}
        <label
          htmlFor="profile-input"
          className="absolute -bottom-8 left-36 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </label>

        {/* Hidden Profile Image Input */}
        <input
          id="profile-input"
          type="file"
          accept="image/*"
          onChange={handleProfileImageChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default ProfileImage;
