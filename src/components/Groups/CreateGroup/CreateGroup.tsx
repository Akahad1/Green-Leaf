"use client";

import Loader from "@/components/Loader/CommonLoader/CommonLoader";
import { useCreateGroup, useGetMyGroup } from "@/hooks/group.hook";
import { useGetUser } from "@/hooks/user.hook";
import { IGroup } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
interface TUserId {
  userId: string;
}
const CreateGroup: React.FC<TUserId> = ({ userId }) => {
  const { data: userData, isLoading } = useGetUser(userId);
  const { data: AllMyGroup, isLoading: groupLoader } = useGetMyGroup(userId);
  const { mutate: addGroup, isPending } = useCreateGroup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = form.fullName.value;
    const description = form.description.value;
    const groupData = {
      name,
      description,
      adminId: userId,
    };
    console.log(groupData);

    try {
      const res = await addGroup(groupData);
      console.log(res);

      toast.success(" Create Group In successfully");
    } catch (error) {
      console.log(error);
    }

    form.reset();
  };
  if (isLoading || groupLoader) {
    return <Loader></Loader>;
  }
  console.log(AllMyGroup);
  return (
    <div className="bg-white min-h-screen p-4">
      <p className="lg:text-2xl text-xl font-semibold mb-10 ">Create group</p>
      <div className="flex items-center mb-5">
        {userData?.data.image ? (
          <Image
            src={userData?.data.image}
            alt="User profile"
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
        ) : (
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqtktl3g6wWkAzvUAi32yzYgb-jZ0-Pn0sQ&s"
            alt="User profile"
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
        )}

        <div className="ml-3">
          <h2 className="text-sm font-semibold">{userData?.data.name}</h2>
          <p className="text-sm">Admin</p>
          {/* <p className="text-xs text-gray-500">
                        {item.createdAt.split("T")[0]}
                      </p> */}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Group Name"
          name="fullName"
          className="w-full border hover:border-slate-700 border-slate-300 p-3"
          required
        />
        <textarea
          placeholder="Description"
          className="h-16 mt-5 p-3 w-full border hover:border-slate-700 border-slate-300"
          name="description"
        />
        <button type="submit" className="btn btn-primary mt-10 w-full">
          Create Group
        </button>
      </form>
      <div>
        <p className="text-lg  mt-10 ">Groups you've joined</p>
      </div>
      <div>
        {Array.isArray(AllMyGroup?.data) && AllMyGroup?.data.length === 0 ? (
          <p className="text-sm mt-10 text-blue-700">Please join group</p>
        ) : (
          <div>
            {AllMyGroup?.data?.map((group: IGroup) => (
              <Link href={`/group/${group?._id}`} key={group._id}>
                <div className="flex gap-6 mt-5 mb-5 hover:bg-gray-200 p-3">
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
                      className="w-14 h-14 rounded-xl"
                      width={100}
                      height={90}
                    />
                  )}
                  <div className="mt-2">
                    <p>{group.name}</p>
                    <p>{new Date(group.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default CreateGroup;
