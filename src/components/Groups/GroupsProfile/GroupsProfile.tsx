"use client";
import React, { useState } from "react";

const GroupProfile = () => {
  const [activeTab, setActiveTab] = useState("discussion");
  const [coverImage, setCoverImage] = useState(
    "https://via.placeholder.com/1200x400"
  );

  // Function to handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setCoverImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

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
            <h1 className="text-2xl font-bold text-gray-800">আমাদের গ্রুপ</h1>
            <p className="text-gray-600">Members: ১,২০০</p>
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
      </div>
    </div>
  );
};

export default GroupProfile;
