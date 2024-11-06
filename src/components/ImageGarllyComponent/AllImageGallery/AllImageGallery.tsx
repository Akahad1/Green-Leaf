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
    return <CardLoder></CardLoder>;
  }
  console.log("allpost", AllPost);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ml-4 min-h-screen">
        {AllPost?.data ? (
          <>
            {AllPost?.data.map((item: TPost) => (
              <ImageCard key={item._id} item={item} />
            ))}
          </>
        ) : (
          <>
            <p className="text-xl lg:text-3xl text-center mt-10">
              There are no Data{" "}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AllImageGallery;
