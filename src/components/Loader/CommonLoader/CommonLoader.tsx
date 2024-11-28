"use client";

import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <p className="mt-6 text-xl font-medium text-gray-700"></p>
    </div>
  );
};

export default Loader;
