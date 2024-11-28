"use client";
import React from "react";

const CardLoder = () => {
  return (
    <div>
      <div className="max-w-xl w-96 mt-5 bg-white shadow-md rounded-lg overflow-hidden mb-6 animate-pulse ">
        {/* Post Header Loader */}
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="ml-3">
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
              <div className="w-16 h-3 bg-gray-200 rounded mt-1"></div>
            </div>
          </div>
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        </div>

        {/* Post Content Loader */}
        <div className="px-4">
          <div className="w-full h-4 bg-gray-300 rounded mt-2"></div>
          <div className="w-5/6 h-4 bg-gray-300 rounded mt-2"></div>
        </div>

        {/* Post Image Loader */}
        <div className="mt-2 w-full h-48 bg-gray-300"></div>

        {/* Post Footer Loader */}
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-4 bg-gray-300 rounded"></div>
            <div className="w-10 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
          <div className="w-12 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CardLoder;
