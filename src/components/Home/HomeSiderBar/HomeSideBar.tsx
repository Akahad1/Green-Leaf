"use client";

import { useFollowUser, useGetAllUser } from "@/hooks/user.hook";
import { TUser } from "@/types";
import { currentUser } from "@/Services/AuthService"; // Replace with your auth utility
import React, { useEffect, useState } from "react";

export interface ProfileProps {
  loggedInUserId?: string; // Optional prop in case you want to pass it down
}

const HomeSidebar: React.FC<ProfileProps> = () => {
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null); // State to track logged-in user ID
  const { data: users, isLoading } = useGetAllUser(); // Fetch all users
  const { mutate: toggleFollow } = useFollowUser(); // Follow/Unfollow mutation

  // Fetch the current user ID when the component mounts
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const user = await currentUser();
      setLoggedInUserId(user?._id || null);
    };
    fetchLoggedInUser();
  }, [loggedInUserId]);

  const handleFollowToggle = async (userId: string) => {
    if (!loggedInUserId) return; // Ensure logged-in user ID is available

    try {
      await toggleFollow({
        userId,
        followerId: loggedInUserId,
      });
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  if (isLoading || !loggedInUserId) {
    return <span>Loading...</span>; // Show loading state until user data and loggedInUserId are ready
  }

  return (
    <div className="hidden lg:block lg:col-span-3">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <ul className="space-y-4">
          {users?.data?.map((user: TUser) => (
            <li key={user._id} className="flex items-center justify-between">
              {/* User Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={user.image || "/default-profile.png"}
                  alt={`${user.name}'s profile`}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                </div>
              </div>
              {/* Follow/Unfollow Button */}
              <button
                onClick={() => handleFollowToggle(user._id)}
                className={`px-4 py-2 text-sm rounded ${
                  user.followers.includes(loggedInUserId)
                    ? "bg-red-500 text-white"
                    : "bg-blue-500 text-white"
                }`}
              >
                {user?.followers.includes(loggedInUserId)
                  ? "Unfollow"
                  : "Follow"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomeSidebar;
