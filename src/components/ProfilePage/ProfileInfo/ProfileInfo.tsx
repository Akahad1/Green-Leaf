"use client";
import React, { useState } from "react";

import { toast } from "sonner";
import { ProfileCommonPageProps } from "../ProfileCommonPage/ProfileCommonPage";
import { useAddUserInfo, useGetUser } from "@/hooks/user.hook";
import PremiumButton from "../PremiumButton/PremiumButton";

// import PremiumButton from "../PremiumButton/PremiumButton";

const ProfileInfo: React.FC<ProfileCommonPageProps> = ({ userId }) => {
  console.log("info", userId);
  const { data: userData, isLoading } = useGetUser(userId);
  const { mutate: UpdateData } = useAddUserInfo();

  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal visibility
  // Manage form values

  if (isLoading) {
    return <span>..</span>;
  }

  // Function to open modal and pre-fill form with existing values
  const openModal = async () => {
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = form.Fullname.value;
    const address = form.address.value;
    const details = form.bio.value;
    console.log(name, address, details);

    try {
      const info = {
        user: userId,
        data: {
          name,
          address,
          details,
        },
      };

      UpdateData(info);
    } catch (error) {
      console.log("error", error);
    }
    // Call API to update the user details, then close the modal
  };

  return (
    <div>
      <div className="p-6 pt-12 text-center lg:text-left mt-5">
        <div className="lg:flex lg:justify-between lg:items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {userData?.data.name}
              {userData?.data?.verified === true ? (
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-blue-800 w-10 inline"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>
                </span>
              ) : (
                <></>
              )}
            </h1>

            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-2 lg:space-y-0 mt-2">
              <div>
                <span className="font-bold">Followers:</span>{" "}
                {userData?.data?.followers.length}
              </div>
              <div>
                <span className="font-bold">Address: </span>
                {userData?.data?.address}
              </div>
              <div>
                <span className="font-bold">Contact:</span>{" "}
                {userData?.data.email}
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4n mb-3">
          <h2 className="text-xl font-bold">Bio</h2>
          <p className="text-gray-700">{userData?.data.details}</p>
        </div>
        <PremiumButton
          email={userData?.data?.email}
          userId={userData?.data?._id}
        ></PremiumButton>
      </div>

      {/* Stats and Action Buttons */}
      <div className="p-6 border-t border-gray-200 flex justify-between items-center">
        <div className="flex space-x-4">
          <div className="mt-4">
            <span className="font-bold">Following:</span>{" "}
            {userData?.data?.followed.length}
          </div>
        </div>
        <div>
          <button
            className="w-full  text-white font-medium py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition p-3"
            onClick={openModal}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Update Information</h2>
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-4">
                <label htmlFor="fullname" className="block font-bold mb-1">
                  Name
                </label>
                <input
                  id="fullname"
                  type="text"
                  name="Fullname"
                  className="input input-bordered w-full"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Address Field */}
              <div className="mb-4">
                <label htmlFor="address" className="block font-bold mb-1">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  className="input input-bordered w-full"
                  placeholder="Enter your address"
                />
              </div>

              {/* Bio Field */}
              <div className="mb-4">
                <label htmlFor="bio" className="block font-bold mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  className="textarea textarea-bordered w-full"
                  placeholder="Tell us about yourself"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="  text-white font-medium py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition p-3"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
