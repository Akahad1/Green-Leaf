"use client";

import CardLoder from "@/components/Loader/CardLoder/CardLoder";
import CommentModal from "@/components/ProfilePage/Comment/CommentModal";
import DropdownToggle from "@/components/ProfilePage/DropdownToggle/DropdownToggle";
import { ProfileCommonPageProps } from "@/components/ProfilePage/ProfileCommonPage/ProfileCommonPage";
import { useGetComment } from "@/hooks/comment.hook";
import { useGetSpecificUserPost } from "@/hooks/post.hook";
import { Tcommet, TPost } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { FaArrowDown, FaArrowUp, FaShareAlt } from "react-icons/fa";

const MyPost: React.FC<ProfileCommonPageProps> = ({ userId }) => {
  const [postid, setPostId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { data: allPost, isLoading } = useGetSpecificUserPost(userId);
  const { data: comments, isLoading: commentLoading } = useGetComment(postid);
  if (commentLoading) {
    return (
      <div>
        <CardLoder></CardLoder>
      </div>
    );
  }
  if (isLoading) {
    return <CardLoder></CardLoder>;
  }
  const handleOpenModal = (id: string) => {
    setPostId(id);
    setShowModal(true);
  };
  console.log("allPost", allPost);

  return (
    <div className="flex justify-center min-h-screen ">
      <div>
        <div className="text-center text-2xl  pt-10 mb-10">My All Post</div>
        {allPost?.data?.length === 0 ? (
          <p className="text-2xl text-red-500 text-center ">
            You have not created any posts
          </p>
        ) : (
          ""
        )}
        <div className="grid lg:grid-cols-3 ml-5 md:grid-cols-2 grid-cols-1 lg:gap-5 md:gap-3 lg:mr-4 mr-5">
          {allPost?.data.map((item: TPost) => (
            <div
              key={item._id}
              className="max-w-xl mt-5   bg-white shadow-md rounded-lg overflow-hidden mb-6"
            >
              {/* Post Header */}
              <div className="flex justify-between items-center px-4 py-3">
                <div className="flex items-center">
                  <Image
                    src={item.user.image}
                    alt="User profile"
                    className="w-10 h-10 rounded-full"
                    width={40}
                    height={40}
                  />
                  <div className="ml-3">
                    <h2 className="text-sm font-semibold">
                      {item.user.name}
                      {item?.user?.verified === true ? (
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
                    </h2>
                    <p className="text-xs text-gray-500">
                      {item.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>

                {/* 3 Dot Dropdown */}
                <div>
                  {/* Dropdown logic for Edit/Delete goes here */}

                  <DropdownToggle
                    postid={item._id}
                    currentCategory={item.catagory}
                    currentImage={item.image}
                    currentText={item.text}
                  ></DropdownToggle>
                </div>
              </div>

              {/* Post Content */}
              <div className="px-4">
                <p className="text-sm text-gray-700">{item.text}</p>
              </div>

              {/* Post Image */}
              <div className="mt-2">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt="Post image"
                    className="w-full h-auto"
                    width={500}
                    height={300}
                  />
                ) : (
                  <p></p>
                )}
              </div>

              {/* Post Footer */}
              <div className="flex justify-between items-center px-4 py-3">
                <div className="flex items-center space-x-2">
                  {/* Upvote Button */}

                  <FaArrowUp />
                  <span>{item.upvote}</span>

                  {/* Downvote Button */}

                  <FaArrowDown />
                  <span>{item.downvote}</span>
                </div>
                {/* Comments Section */}
                <div className="px-4">
                  <button
                    onClick={() => handleOpenModal(item._id)}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    View Comments
                  </button>
                </div>
                <div>
                  <button className="flex items-center text-gray-600 hover:text-blue-500 space-x-1">
                    <FaShareAlt />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Comments Modal */}
              {showModal && (
                <CommentModal onClose={() => setShowModal(false)}>
                  <div className="p-6 w-full max-w-lg bg-white rounded-lg shadow-lg">
                    {/* Modal Header */}
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-semibold text-gray-800">
                        Comments
                      </h3>
                      <button
                        onClick={() => setShowModal(false)}
                        className="text-2xl text-gray-600 hover:text-gray-800 font-bold"
                      >
                        &times;
                      </button>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-6">
                      {comments?.data.map((comment: Tcommet) => (
                        <div
                          key={comment?._id}
                          className="flex space-x-4 p-4 bg-gray-50 rounded-lg shadow-sm"
                        >
                          {/* Profile Image */}
                          {comment?.user ? (
                            <Image
                              className="rounded-full"
                              src="https://i0.wp.com/jiggambia.com/wp-content/uploads/2024/01/19e156dd3f2d29d0b5e8b081729abe9b.jpg?fit=400%2C400&ssl=1"
                              height={40}
                              width={40}
                              alt="user profile image"
                            />
                          ) : (
                            <Image
                              className="rounded-full"
                              src="https://i0.wp.com/jiggambia.com/wp-content/uploads/2024/01/19e156dd3f2d29d0b5e8b081729abe9b.jpg?fit=400%2C400&ssl=1"
                              height={40}
                              width={40}
                              alt="default profile image"
                            />
                          )}

                          <div className="flex-1">
                            <p className="text-gray-800 text-sm">
                              {comment.text}
                            </p>
                          </div>

                          {/* Edit and Delete Buttons */}
                          <div className="flex space-x-2">
                            <button className="text-blue-500 text-sm hover:underline">
                              Edit
                            </button>
                            <button
                              // onClick={() => deleteComment(comment?._id)}
                              className="text-red-500 text-sm hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* No Comments Message */}
                    {comments?.data.length === 0 && (
                      <div className="p-4 text-center text-gray-500">
                        No comments available. Be the first to comment!
                      </div>
                    )}

                    {/* Comment Input Form */}
                    <div className="mt-6">
                      <form className="flex flex-col">
                        <textarea
                          name="text"
                          placeholder="Write a comment..."
                          className="block w-full p-4 mt-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                        <button
                          type="submit"
                          className="self-end px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          Post Comment
                        </button>
                      </form>
                    </div>
                  </div>
                </CommentModal>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPost;
