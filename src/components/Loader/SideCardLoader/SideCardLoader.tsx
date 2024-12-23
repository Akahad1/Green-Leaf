import React from "react";

const SideCardLoader = () => {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex gap-4 mt-5 mb-5 p-4 animate-pulse">
          <div className="w-14 h-14 rounded-full bg-gray-300"></div>
          <div className="flex-grow">
            <div className="mb-2">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="h-8 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideCardLoader;
