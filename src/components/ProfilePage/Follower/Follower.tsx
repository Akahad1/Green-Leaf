"use client";
import { useEffect, useState } from "react";

import ShowFollowData from "./ShowFollowData";
import { ProfileCommonPageProps } from "../ProfileCommonPage/ProfileCommonPage";
import { useGetUser } from "@/hooks/user.hook";
import axios from "axios";
import AxiosInstance from "@/lib/AuthInstanse";

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

const FollowersList: React.FC<ProfileCommonPageProps> = ({ userId }) => {
  const { data: userData, isLoading } = useGetUser(userId);
  const userids = userData?.data?.followers;

  const [fetchedUserData, setFetchedUserData] = useState<User[]>([]);

  const fetchUserData = async (userIds: string[]): Promise<User[]> => {
    const userDataArray: User[] = [];

    for (const userId of userIds) {
      const response = await AxiosInstance.get(
        `http://localhost:5000/api/a6/user/${userId}`
      ); // Replace with axios.get
      userDataArray.push(response.data as User);
    }

    return userDataArray;
  };

  useEffect(() => {
    if (userids) {
      const getUserData = async () => {
        const data: User[] = await fetchUserData(userids);
        setFetchedUserData(data);
        console.log("Fetched data:", data);
      };

      getUserData();
    }
  }, [userids]);

  if (isLoading) return <div>Loading...</div>;
  console.log("fetcheUserdata", fetchUserData);
  return (
    <div>
      <div className="text-2xl mt-3 mb-4">My Follower</div>
      <div>
        {fetchedUserData.length === 0 ? (
          <p className="text-2xl text-red-500 mt-5 ">You have No Follower</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {fetchedUserData.map((item, index) => (
              <ShowFollowData key={index} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowersList;
