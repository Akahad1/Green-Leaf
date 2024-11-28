"use client";
import Image from "next/image";
import { FaArrowUp, FaArrowDown, FaShareAlt } from "react-icons/fa";
import { useState } from "react";

import CardLoder from "@/components/Loader/CardLoder/CardLoder";
import { Tcommet, TPost } from "@/types";
import DropdownToggle from "@/components/ProfilePage/DropdownToggle/DropdownToggle";
import CommentModal from "@/components/ProfilePage/Comment/CommentModal";
import {
  useGetAllPost,
  useGetSpecificUserPost,
  usePostVote,
} from "@/hooks/post.hook";
import {
  useAddComment,
  useDeleteComment,
  useGetComment,
} from "@/hooks/comment.hook";

interface UserProfileUserId {
  UserId: string;
}
const UserPostCard: React.FC<UserProfileUserId> = ({ UserId }) => {
  const [postid, setPostId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { mutate: addComment } = useAddComment();

  const [upvoted, setUpvoted] = useState(false); // Track if the user has upvoted
  const [downvoted, setDownvoted] = useState(false);

  const id = UserId;
  const { data: postData, isLoading } = useGetSpecificUserPost(id);
  const { mutate: postvote } = usePostVote();
  const { mutate: deleteComment } = useDeleteComment();
  console.log("id", postid);
  const { data: comments, isLoading: commentLoading } = useGetComment(postid);
  // if (commentLoading) {
  //   return (
  //     <div className=" ">
  //       <CardLoder></CardLoder>
  //     </div>
  //   );
  // }

  if (isLoading) {
    return (
      <div className=" ">
        <CardLoder></CardLoder>
      </div>
    );
  }
  const handleOpenModal = (id: string) => {
    setPostId(id);
    setShowModal(true);
  };
  console.log("post", comments);
  // Handle adding a new comment (you can implement backend logic)

  const handleUpvote = async (postId: string) => {
    // Log the postId to ensure it is defined
    console.log("Post ID before API call:", postId);

    if (!postId) {
      console.error("Post ID is missing before calling postvote");
      return;
    }

    try {
      // Log the object being sent to the postvote function
      const payload = {
        id: postId,
        user: id,
        vote: "upvote",
      };
      console.log("Payload to be sent to postvote:", payload);

      // Call the API
      const res = await postvote(payload);
      console.log("API response:", res);

      setUpvoted(!upvoted); // Toggle upvote state
      if (downvoted) setDownvoted(false); // If downvoted before, reset downvote
    } catch (error) {
      console.error("Error updating vote:", error);
    }
  };

  // Handle downvote
  const handleDownvote = async (postId: string) => {
    console.log(postId);

    const res = await postvote({
      id: postId,
      user: id,
      vote: "downvote",
    });
    console.log(res);
    setDownvoted(!downvoted);
    if (upvoted) setUpvoted(false);
  };
  const handleAddComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget); // Get form data
    const text = formData.get("text") as string;
    const commentInfo = {
      user: id,
      post: postid,
      text,
    };

    try {
      const res = await addComment(commentInfo); // Pass FormData to Redux action
      console.log("res", res);
    } catch (error) {
      console.log("Error:", error);
    }
    // Prevent page reload on form submission
  };
  return (
    <div>
      {postData?.data.map((item: TPost) => (
        <div
          key={item._id}
          className="max-w-xl mt-5 bg-white shadow-md rounded-lg overflow-hidden mb-6"
        >
          {/* Post Header */}
          <div className="flex justify-between items-center px-4 py-3">
            <div className="flex items-center">
              {item?.user.image ? (
                <Image
                  src={item.user.image}
                  alt="User profile"
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
              ) : (
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqtktl3g6wWkAzvUAi32yzYgb-jZ0-Pn0sQ&s"
                  alt="User profile"
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
              )}
              <div className="ml-3">
                <h2 className="text-sm font-semibold">{item.user.name}</h2>
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
                userId={""}
                userPostId={item.user._id}
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
              <button
                onClick={() => handleUpvote(item._id)}
                className={`flex items-center space-x-1 ${
                  upvoted
                    ? "text-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                <FaArrowUp />
                <span>{item.upvote}</span>
              </button>

              {/* Downvote Button */}
              <button
                onClick={() => handleDownvote(item._id)}
                className={`flex items-center space-x-1 ${
                  downvoted
                    ? "text-red-500"
                    : "text-gray-600 hover:text-red-500"
                }`}
              >
                <FaArrowDown />
                <span>{item.downvote}</span>
              </button>
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
                      {comment?.user?.image ? (
                        <Image
                          className="rounded-full"
                          src={comment?.user.image}
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
                        <p className="text-gray-800 text-sm">{comment.text}</p>
                      </div>

                      {/* Edit and Delete Buttons */}
                      <div className="flex space-x-2">
                        <button className="text-blue-500 text-sm hover:underline">
                          Edit
                        </button>
                        <button
                          onClick={() => deleteComment(comment?._id)}
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
                  <form onSubmit={handleAddComment} className="flex flex-col">
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
  );
};

export default UserPostCard;
