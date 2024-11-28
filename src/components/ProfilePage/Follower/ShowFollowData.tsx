"use client";
import Image from "next/image";
import React from "react";

type UserData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "user";
  address: string;
  details: string;
  image: string;
  coverImage: string;
  passwordChange: boolean;
  favourite: string[];
  followers: string[];
  followed: string[];
  verified: boolean;
};

interface ShowFollowDataProps {
  item: {
    data: UserData; // Ensure the prop includes data
    messages: string;
    success: boolean;
  };
}

const ShowFollowData: React.FC<ShowFollowDataProps> = ({ item }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white to-red-500 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
      <Image
        src={item?.data.image}
        alt={`Image`}
        width={80}
        height={80}
        className="w-20 h-20 rounded-full mb-4 border-4 border-white shadow-md object-cover"
      />
      <h2 className="text-xl font-bold ">{item?.data.name}</h2>
      <p className="text-sm  mt-2 italic">
        {item?.data.details || "No additional details provided."}
      </p>
    </div>
  );
};

export default ShowFollowData;
