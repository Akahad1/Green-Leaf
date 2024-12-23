import { useGetMyGroup } from "@/hooks/group.hook";
import { IGroup } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ShowMYGroup = ({ userId }: { userId: string }) => {
  const { data: AllMyGroup, isLoading: groupLoader } = useGetMyGroup(userId);
  return (
    <div>
      <div className="p-4     max-w-xs  rounded-lg border border-gray-200 shadow-md  bg-white ">
        <p className="text-lg font-semibold text-gray-700 mb-3">
          Groups you've joined
        </p>
        <div>
          {AllMyGroup?.data?.slice(0, 3).map((group: IGroup) => (
            <div key={group._id} className="flex gap-4 mt-5 mb-5 p-4 ">
              <Link href={`/group/${group._id}`} className="flex-shrink-0">
                {group.coverImage ? (
                  <Image
                    src={group.coverImage}
                    alt="Group Cover"
                    className="w-14 h-14 rounded-full object-cover"
                    width={56}
                    height={56}
                  />
                ) : (
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqtktl3g6wWkAzvUAi32yzYgb-jZ0-Pn0sQ&s"
                    alt="Default Cover"
                    className="w-14 h-14 rounded-full object-cover"
                    width={56}
                    height={56}
                  />
                )}
              </Link>
              <div className="flex-grow">
                <Link href={`/group/${group._id}`}>
                  <div className="mb-2">
                    <p className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition">
                      {group.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Created on{" "}
                      {new Date(group.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
                <Link href={`/group/${group._id}`}>
                  <button className="btn btn-sm text-white font-medium rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all px-4 py-2">
                    View Group
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowMYGroup;
