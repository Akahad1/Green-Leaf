"use client";
import React, { useState } from "react";

import SearchFilter from "../Filtering/Filterring";
import HomePostCard from "../HomePostCartd/HomePostCartd";
import { useGetAllPost } from "@/hooks/post.hook";
import { ProfileCommonPageProps } from "@/components/ProfilePage/ProfileCommonPage/ProfileCommonPage";
import HomeSidebar from "../HomeSiderBar/HomeSideBar";

interface FilterParams {
  name?: string;
  value?: string;
  // Add any other filter parameters here
}
const CommonPage: React.FC<ProfileCommonPageProps> = ({ userId }) => {
  const [catagoryParam, setCatagoryParm] = useState<string>("");
  const [searchParam, setSearchParm] = useState<string>("");
  const [premiumParam, setpremiumParm] = useState<string>("");

  const {
    data: CategoryData,
    isSuccess: categorySuccess,
    isLoading,
  } = useGetAllPost(catagoryParam, searchParam, premiumParam);

  console.log(catagoryParam, searchParam);
  console.log(CategoryData);

  return (
    <div className="flex justify-center   mb-10 lg:mx-0 lg:mr-0 mx-4 ">
      <div>
        <SearchFilter
          setParm={setCatagoryParm}
          setSearchParm={setSearchParm}
        ></SearchFilter>
        <div className="flex justify-between lg:ml-8">
          <HomePostCard
            currentUserId={userId}
            data={CategoryData}
            isLoading={isLoading}
          ></HomePostCard>
          <div className="hidden lg:block relative    w-72 ml-20">
            <HomeSidebar
              setParm={setCatagoryParm}
              setSearchParm={setSearchParm}
              Parm={catagoryParam}
              setpremiumParm={setpremiumParm}
            ></HomeSidebar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonPage;
