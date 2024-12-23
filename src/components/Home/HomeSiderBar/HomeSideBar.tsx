"use client";
import {
  useGetMyGroup,
  useNotInvolvedGroup,
  usesendInviteRequest,
} from "@/hooks/group.hook";
import { IGroup } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ShowMYGroup from "./ShowMYGroup/ShowMYGroup";
import SideCardLoader from "@/components/Loader/SideCardLoader/SideCardLoader";

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
  const { data: NotInvolvedGroup, isLoading } = useNotInvolvedGroup(userId);

  console.log("userId", userId);

  const { mutate: SendRequest } = usesendInviteRequest();

  // Notify parent component of filter changes

  if (isLoading) {
    return <SideCardLoader></SideCardLoader>;
  }
  console.log("NotInvolvedGroup", NotInvolvedGroup);

  return (
    <div className="">
      <ShowMYGroup userId={userId}></ShowMYGroup>
      <div className="">
        <div className="max-w-xs lg:sticky mt-5 top-20 rounded-lg border border-gray-200 shadow-md p-4 bg-white mb-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Suggested Group
          </h3>
          {NotInvolvedGroup?.data?.slice(0, 3).map((group: IGroup) => (
            <div key={group._id}>
              <div
                className="relative w-full mt-5 h-24 rounded-t-lg bg-cover bg-center"
                style={{
                  backgroundImage: group.coverImage
                    ? `url(${group.coverImage})`
                    : `url('/default-cover.jpg')`,
                }}
              ></div>
              <div className="text-center mt-8">
                <h4 className="text-md font-semibold text-gray-800">
                  {group.name}
                </h4>
                <p className="text-sm text-gray-500">
                  Members: {group.members.length.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => SendRequest({ groupId: group._id, userId })}
                className="mt-4 w-full  text-white font-medium py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
              >
                Request to Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSidebar;
