"use client";

import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import CardLoder from "@/components/Loader/CardLoder/CardLoder";
import { ProfileCommonPageProps } from "@/components/ProfilePage/ProfileCommonPage/ProfileCommonPage";
import { useGetSpecificUserPost } from "@/hooks/post.hook";
import { TPost } from "@/types";

const AllImageGallery: React.FC<ProfileCommonPageProps> = ({ userId }) => {
  const { data: AllPost, isLoading } = useGetSpecificUserPost(userId);
  if (isLoading) {
    return <CardLoder />;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {AllPost?.data ? (
          AllPost?.data.map((item: TPost) => (
            <ImageCard key={item._id} item={item} />
          ))
        ) : (
          <p className="text-2xl lg:text-3xl text-center text-gray-500 mt-10">
            No posts found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllImageGallery;
