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

const MYAllFolloweing: React.FC<ShowFollowDataProps> = ({ item }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md transition-transform w-72 lg:w-96 transform hover:scale-105">
      {item?.data.image ? (
        <Image
          src={item?.data.image}
          alt={`profile`}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full mb-2 object-cover"
        />
      ) : (
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtu74pEiq7ofeQeTsco0migV16zZoBwSlGg&s"
          alt={`profile`}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full mb-2 object-cover"
        />
      )}
      <h2 className="text-lg ">{item?.data.name}</h2>
      <h2 className="text-lg ">{item?.data.email}</h2>
    </div>
  );
};

export default MYAllFolloweing;
