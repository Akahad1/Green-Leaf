"use client";
import Loader from "@/components/Loader/CommonLoader/CommonLoader";
import {
  useMemberApproval,
  useSpecificGetMyGroup,
  useUpdateSpecificMyGroup,
} from "@/hooks/group.hook";
import Image from "next/image";

import React, { useState } from "react";
import { toast } from "sonner";
import { uploadImageToImgBB } from "./UploadImage";
import GroupManagment from "../GroupManagment/GroupManagment";
import GroupDiscussion from "../GroupDiscussion/GroupDiscussion";

interface TProps {
  groupId: string;
  userId: string;
}
export interface TReq {
  user: {
    image: string;
    name: string;
    _id: string;
  };
  status: string;
  _id: string;
}

const GroupProfile: React.FC<TProps> = ({ groupId, userId }) => {
  const { data: groupData, isLoading } = useSpecificGetMyGroup(userId, groupId);
  const { mutate: ApprovMember, isSuccess } = useMemberApproval();
  const { mutate: updateGroup } = useUpdateSpecificMyGroup();

  const [requests, setRequests] = useState([]);
  console.log("groupid,", groupId, "userid", userId);
  const [activeTab, setActiveTab] = useState("discussion");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoadings, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState(
    "https://via.placeholder.com/1200x400"
  );

  // Function to handle image upload
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const uploadedUrl = await uploadImageToImgBB(file);
      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
        console.log(imageUrl);
        updateGroup({
          userId,
          groupId,
          groupData: { coverImage: uploadedUrl },
        });
      } else {
        setError("Failed to upload the image.");
      }
    } catch (err) {
      setError("An error occurred during upload.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequest = (requestId: string, status: string) => {
    console.log(requestId);
    ApprovMember({ groupId, requestId, status });
    if (isSuccess) {
      toast.success("Your req send succfully");
    }
    console.log(status);
  };

  if (isLoading) {
    return <Loader></Loader>;
  }
  console.log("groupData", groupData);

  return (
    <div className="w-full relative max-w-4xl mx-auto  ">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {groupData?.data.coverImage ? (
          <Image
            src={groupData?.data.coverImage}
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
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Group Info */}
        <div className="p-4 mt-10 mb-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {groupData?.data?.name}
              </h1>
              <p className="text-gray-600">
                Members: {groupData?.data?.members.length}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Invite
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <div className="flex">
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === "about"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("about")}
            >
              About
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === "discussion"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("discussion")}
            >
              Discussion
            </button>
            <button
              className={`flex-1 py-2 text-center ${
                activeTab === "members"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              onClick={() => setActiveTab("members")}
            >
              Members
            </button>
            {groupData?.data.adminId === userId && (
              <button
                className={`flex-1 py-2 text-center ${
                  activeTab === "Managment"
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => {
                  setActiveTab("Managment");
                  setRequests(
                    groupData?.data?.invitationRequests.filter(
                      (req: { status: string }) => req.status === "pending"
                    )
                  );
                }}
              >
                Managment
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === "about" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800">About Group</h2>
            <p className="text-gray-600 mt-2">
              <span>Description: </span>
              {groupData?.data.description}
            </p>
          </div>
        )}

        {activeTab === "discussion" && (
          <div>
            <GroupDiscussion
              groupId={groupId}
              userId={userId}
            ></GroupDiscussion>
          </div>
        )}

        {activeTab === "members" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Members</h2>
            <p className="text-gray-600 mt-2">
              List of active members of this group
            </p>
            <div>
              {groupData?.data?.members.map(
                (user: Pick<TReq, "user">["user"]) => (
                  <div
                    key={user._id}
                    className="flex mb-4 border border-slate-600 mt-3 p-3 rounded-md"
                  >
                    {/* User's Cover Image */}
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt="User profile"
                        className="w-10 h-10 rounded-full"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqtktl3g6wWkAzvUAi32yzYgb-jZ0-Pn0sQ&s"
                        alt="User profile"
                        className="w-10 h-10 rounded-full"
                        width={50}
                        height={50}
                      />
                    )}

                    {/* User's Name */}
                    <div>
                      <p className="text-md ml-3 mt-2 font-medium">
                        {user.name}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
        {activeTab === "Managment" && groupData?.data.adminId === userId && (
          <div>
            <GroupManagment
              requests={requests}
              handleRequest={handleRequest}
            ></GroupManagment>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupProfile;
