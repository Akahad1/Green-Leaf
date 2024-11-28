"use client";

import CardLoder from "@/components/Loader/CardLoder/CardLoder";
import { ProfileCommonPageProps } from "@/components/ProfilePage/ProfileCommonPage/ProfileCommonPage";
import { useGetUser } from "@/hooks/user.hook";
import axios from "axios";
import { useEffect, useState } from "react";
import ShowMYAllFollower from "./ShowMyAllFollower";
import Loader from "@/components/Loader/CommonLoader/CommonLoader";

type User = {
  data: {
    // Ensure this matches the structure you expect from the API
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
  messages: string;
  success: boolean;
};

const MyAllFollower: React.FC<ProfileCommonPageProps> = ({ userId }) => {
  const { data: userData, isLoading } = useGetUser(userId);
  const userids = userData?.data?.followers;

  const [fetchedUserData, setFetchedUserData] = useState<User[]>([]);

  const fetchUserData = async (userIds: string[]): Promise<User[]> => {
    const userDataArray: User[] = [];

    for (const userId of userIds) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/a6/user/${userId}`
        );
        userDataArray.push(response.data as User);
      } catch (error) {
        console.error(`Error fetching data for user ID ${userId}:`, error);
      }
    }

    return userDataArray;
  };

  useEffect(() => {
    if (userids) {
      if (typeof window !== "undefined") {
        const getUserData = async () => {
          const data: User[] = await fetchUserData(userids);
          setFetchedUserData(data);
          console.log("Fetched data:", data);
        };

        getUserData();
      }
    }
  }, [userids]);

  if (isLoading)
    return (
      <div>
        <Loader></Loader>
      </div>
    );

  return (
    <div className="min-h-screen">
      <div className="text-2xl pt-10 mb-4 ml-6 text-center">My Follower</div>
      {fetchedUserData.length === 0 ? (
        <p className="text-2xl text-red-500 text-center ">
          You have not created any Follower
        </p>
      ) : (
        ""
      )}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 ml-12 mt-5 justify-center">
        {fetchedUserData.map((item) => (
          <ShowMYAllFollower
            key={item?.data.email}
            item={item}
          ></ShowMYAllFollower>
        ))}
      </div>
    </div>
  );
};

export default MyAllFollower;
