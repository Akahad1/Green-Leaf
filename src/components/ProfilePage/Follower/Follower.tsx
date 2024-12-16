"use client";
import { useEffect, useState } from "react";

import ShowFollowData from "./ShowFollowData";
import { ProfileCommonPageProps } from "../ProfileCommonPage/ProfileCommonPage";
import { useGetUser } from "@/hooks/user.hook";
import axios from "axios";
import Link from "next/link";

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
      const response = await axios.get(
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

  if (isLoading) return <div></div>;
  console.log("fetcheUserdata", fetchUserData);
  return (
    <div className="">
      <div>
        {fetchedUserData.length === 0 ? (
          <p className="text-2xl text-red-500 mt-5 ">You have No Follower</p>
        ) : (
          <div className="bg-white border border-slate-300 p-3 px-5 pb-5">
            <div className="flex lg:justify-between">
              <div className="text-xl mt-3 mb-4 font-bold">My Follower</div>
              <Link href="/deshbord/myFollower">
                <div className="lg:text-base mt-4 mb-4 text-blue-600">
                  See All Follower
                </div>
              </Link>
            </div>

            <div className="grid grid-cols-3   gap-3 ">
              {fetchedUserData.slice(0, 6).map((item, index) => (
                <ShowFollowData key={index} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FollowersList;
