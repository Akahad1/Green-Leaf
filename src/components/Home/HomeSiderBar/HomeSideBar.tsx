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
  const { data: AllMyGroup, isLoading: groupLoader } = useGetMyGroup(userId);
  const [status, setStatus] = useState("");

  const { mutate: SendRequest, isSuccess } = usesendInviteRequest();
  if (isSuccess) {
    setStatus("pending");
  }

  // Notify parent component of filter changes

  if (groupLoader) {
    return "loding..";
  }
  if (isLoading) {
    return "loding..";
  }
  console.log("group", NotInvolvedGroup);
  return (
    <div className=" ">
      <div className="p-4   lg:mt-[-78px]  rounded-lg border bg-white  border-slate-700 shadow-md lg:border-slate-500 ">
        <p className="text-xl">Add to your feed</p>
        <div>
          {AllMyGroup?.data?.slice(0, 3).map((group: IGroup) => (
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
      </div>
      <div className="lg:relative">
        <div className="max-w-xs lg:sticky mt-5 top-20 rounded-lg border border-gray-200 shadow-md p-4 bg-white">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Suggested Group
          </h3>
          {AllMyGroup?.data?.slice(0, 3).map((group: IGroup) => (
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
                className="mt-4 w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Request {status ? status : "to Join"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSidebar;
