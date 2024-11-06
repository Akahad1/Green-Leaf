"use client";
import React, { useState } from "react";

import SearchFilter from "../Filtering/Filterring";
import HomePostCard from "../HomePostCartd/HomePostCartd";
import { useGetAllPost } from "@/hooks/post.hook";
import { ProfileCommonPageProps } from "@/components/ProfilePage/ProfileCommonPage/ProfileCommonPage";

interface FilterParams {
  name?: string;
  value?: string;
  // Add any other filter parameters here
}
const CommonPage: React.FC<ProfileCommonPageProps> = ({ userId }) => {
  const [catagoryParam, setCatagoryParm] = useState<string>("");
  const [searchParam, setSearchParm] = useState<string>("");

  const {
    data: CategoryData,
    isSuccess: categorySuccess,
    isLoading,
  } = useGetAllPost(catagoryParam, searchParam);

  console.log(catagoryParam, searchParam);
  console.log(CategoryData);

  return (
    <div className="flex justify-center  mb-10 lg:mx-0 mx-4">
      <div>
        <SearchFilter
          setParm={setCatagoryParm}
          setSearchParm={setSearchParm}
        ></SearchFilter>
        <HomePostCard
          currentUserId={userId}
          data={CategoryData}
          isLoading={isLoading}
        ></HomePostCard>
      </div>
    </div>
  );
};

export default CommonPage;
