"use client";
import { useEffect, useState } from "react";

import MYAllFolloweing from "./MyAllFollwing";
import { ProfileCommonPageProps } from "@/components/ProfilePage/ProfileCommonPage/ProfileCommonPage";
import { useGetUser } from "@/hooks/user.hook";
import axios from "axios";
import CardLoder from "@/components/Loader/CardLoder/CardLoder";

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

const ShowFollowing: React.FC<ProfileCommonPageProps> = ({ userId }) => {
  const { data: userData, isLoading } = useGetUser(userId);
  const userids = userData?.data?.followed;

  const [fetchedUserData, setFetchedUserData] = useState<User[]>([]);

  const fetchUserData = async (userIds: string[]): Promise<User[]> => {
    const userDataArray: User[] = [];

    for (const userId of userIds) {
      try {
        const response = await axios.get(`/user/${userId}`);
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
        <CardLoder></CardLoder>
      </div>
    );

  return (
    <div>
      <div className="text-2xl mt-3 mb-4 ml-6">My Followering</div>
      <div className="grid grid-cols-2 gap-4 ml-6 justify-center">
        {fetchedUserData.map((item) => (
          <MYAllFolloweing key={item.data.email} item={item}></MYAllFolloweing>
        ))}
      </div>
    </div>
  );
};

export default ShowFollowing;
