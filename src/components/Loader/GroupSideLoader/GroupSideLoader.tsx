import React from "react";

const GroupSideLoader = () => {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex gap-6 mt-5 mb-5 hover:bg-gray-200 p-3 animate-pulse"
        >
          <div className="w-14 h-14 rounded-xl bg-gray-300"></div>
          <div className="mt-2 flex-1">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}

      <div className="animate-pulse">
        <div className="flex items-center mb-5">
          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
          <div className="ml-3">
            <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-20"></div>
          </div>
        </div>
        <div className="h-12 bg-gray-300 rounded w-full mb-5"></div>
        <div className="h-16 bg-gray-300 rounded w-full mb-5"></div>
        <div className="h-10 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
};

export default GroupSideLoader;
