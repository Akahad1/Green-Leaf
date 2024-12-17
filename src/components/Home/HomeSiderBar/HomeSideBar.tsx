"use client";
import { useNotInvolvedGroup, usesendInviteRequest } from "@/hooks/group.hook";
import { IGroup } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface SearchFilterProps {
  setParm: React.Dispatch<React.SetStateAction<string>>;
  setSearchParm: React.Dispatch<React.SetStateAction<string>>;
  setpremiumParm: React.Dispatch<React.SetStateAction<string>>;
  Parm: string;
  userId: string;
}

const HomeSidebar: React.FC<SearchFilterProps> = ({
  setParm,
  setSearchParm,
  setpremiumParm,
  userId,
  Parm,
}) => {
  const [contentType, setContentType] = useState<string>("");
  const { data: NotInvolvedGroup, isLoading } = useNotInvolvedGroup(userId);
  const categories = ["Vegetables", "Flowers", "Herbs", "Fruits"];
  const { mutate: SendRequest } = usesendInviteRequest();
  // Update selected category
  const handleCategoryChange = (category: string) => {
    setParm(category);
  };

  // Update content type
  const handleContentTypeChange = (type: string) => {
    setpremiumParm(type);
    setContentType(type);
  };

  // Notify parent component of filter changes
  if (isLoading) {
    return "loding..";
  }
  console.log("group", NotInvolvedGroup);
  return (
    <div className="p-4  lg:sticky top-20 rounded-lg border bg-white  border-slate-700 shadow-md lg:border-slate-500 ">
      <div>
        {NotInvolvedGroup?.data?.map((group: IGroup) => (
          <div className="flex gap-6 mt-5 mb-5  p-3" key={group._id}>
            <Link href={`/group/${group._id}`}>
              {group.coverImage ? (
                <Image
                  src={group.coverImage}
                  alt="Group Cover"
                  className="w-10 h-10 rounded-full"
                  width={60}
                  height={60}
                />
              ) : (
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqtktl3g6wWkAzvUAi32yzYgb-jZ0-Pn0sQ&s"
                  alt="Default Cover"
                  className="w-10 h-10 rounded-xl"
                  width={100}
                  height={90}
                />
              )}
            </Link>
            <div className="">
              <Link href={`/group/${group._id}`} key={group._id}>
                <div>
                  <p className="text-sm">{group.name}</p>
                  <p className="text-sm">
                    {new Date(group.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>

              <div>
                <button
                  className="btn mt-1 btn-sm btn-primary   "
                  onClick={() => SendRequest({ groupId: group._id, userId })}
                >
                  Request to Join
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-semibold mb-4">Filters</h2>
      <h3 className="font-medium text-xl mb-3">Search</h3>
      <input
        type="text"
        onChange={(e) => setSearchParm(e.target.value)}
        placeholder="Search posts..."
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black "
      />
      {/* Categories Section */}
      <div className="mb-4">
        <h3 className="font-semibold text-xl mb-2 mt-3">Categories</h3>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="radio"
              id={`category-${category}`}
              name="category" // Ensures only one can be selected
              className="mr-2 "
              value={category}
              checked={Parm === category}
              onChange={() => handleCategoryChange(category)}
            />
            <label htmlFor={`category-${category}`} className="text-lg">
              {category}
            </label>
          </div>
        ))}
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="all-categories"
            name="category"
            className="mr-2"
            value=""
            checked={Parm === ""}
            onChange={() => handleCategoryChange("")} // Reset category filter
          />
          <label htmlFor="all-categories" className="text-lg">
            All Categories
          </label>
        </div>
      </div>

      {/* Content Type Section */}
      <div>
        <h3 className=" font-semibold text-xl mb-2">Content Type</h3>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="true"
            name="contentType"
            className="mr-2"
            value="true"
            checked={contentType === "true"}
            onChange={() => handleContentTypeChange("true")}
          />
          <label htmlFor="true" className="text-lg">
            Premium
          </label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="false"
            name="contentType"
            className="mr-2"
            value="false"
            checked={contentType === "false"}
            onChange={() => handleContentTypeChange("false")}
          />
          <label htmlFor="false" className="text-lg">
            Regular
          </label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            id="all"
            name="contentType"
            className="mr-2"
            value=""
            checked={contentType === ""}
            onChange={() => handleContentTypeChange("")}
          />
          <label htmlFor="all" className="text-lg">
            All
          </label>
        </div>
      </div>
    </div>
  );
};

export default HomeSidebar;
