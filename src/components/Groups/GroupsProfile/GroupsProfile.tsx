"use client";
import Loader from "@/components/Loader/CommonLoader/CommonLoader";
import { useMemberApproval, useSpecificGetMyGroup } from "@/hooks/group.hook";
import Image from "next/image";

import React, { useState } from "react";
import { toast } from "sonner";

interface TProps {
  groupId: string;
  userId: string;
}
interface TReq {
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

  const [requests, setRequests] = useState([]);
  console.log("groupid,", groupId, "userid", userId);
  const [activeTab, setActiveTab] = useState("discussion");
  const [coverImage, setCoverImage] = useState(
    "https://via.placeholder.com/1200x400"
  );

  // Function to handle image upload
  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {};
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
  console.log("requests", requests);
  console.log("user", requests);
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      {/* Cover Photo */}
      <div
        className="relative h-48 bg-cover bg-center"
        style={{
          backgroundImage: `url('${coverImage}')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        {/* Edit Icon */}
        <div className="absolute top-2 right-2">
          <label htmlFor="coverImageInput" className="cursor-pointer">
            <div className="p-2 bg-gray-800 bg-opacity-70 text-white rounded-full hover:bg-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536M9 11l6.768-6.768a2.5 2.5 0 113.536 3.536L12.5 14.5M9 11l-5 5V21h5l5-5m-5-5l5 5"
                />
              </svg>
            </div>
          </label>
          <input
            id="coverImageInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* Group Info */}
      <div className="p-4">
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
              আমন্ত্রণ করুন
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
              শেয়ার করুন
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
            সম্পর্কে
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "discussion"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("discussion")}
          >
            আলোচনা
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "members"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("members")}
          >
            সদস্যরা
          </button>
          <button
            className={`flex-1 py-2 text-center ${
              activeTab === "members"
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
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === "about" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              গ্রুপ সম্পর্কে
            </h2>
            <p className="text-gray-600 mt-2">
              আমাদের এই গ্রুপটি গার্ডেনিং নিয়ে আলোচনা এবং জ্ঞান ভাগাভাগি করার
              জন্য।
            </p>
          </div>
        )}

        {activeTab === "discussion" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800">আলোচনা</h2>
            <p className="text-gray-600 mt-2">
              এখানে সদস্যরা তাদের মতামত শেয়ার করে।
            </p>
          </div>
        )}

        {activeTab === "members" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800">সদস্যরা</h2>
            <p className="text-gray-600 mt-2">
              এই গ্রুপের সক্রিয় সদস্যদের তালিকা।
            </p>
          </div>
        )}
        {activeTab === "Managment" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Managment</h2>
            <div>
              <h3 className="text-lg mb-4">Pending Requests</h3>
              {requests.map((req: TReq) => (
                <div key={req._id} className="flex mb-4 border p-3 rounded-md">
                  {/* User's Cover Image */}
                  {req?.user.image ? (
                    <Image
                      src={req?.user.image}
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
                      {req.user.name}
                    </p>
                  </div>
                  {/* Action Buttons */}
                  <div className=" lg:ml-96 justify-end ml-7 mt-2 space-x-3">
                    <button
                      onClick={() => handleRequest(req.user._id, "accept")}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRequest(req.user._id, "reject")}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupProfile;
