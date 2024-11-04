"use client";
import Image from "next/image";
import { FaArrowUp, FaArrowDown, FaShareAlt } from "react-icons/fa";
import { useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";

import { toast } from "sonner";

import Link from "next/link";

// import { useRef } from "react";

// import DropdownToggle from "../../profilePage/handleDropdownToggle/handleDropdownToggle";
// import CommentModal from "../../profilePage/comentModal/CommentModal";
import { logInUser, Tcommet, TPost, TPostData } from "@/types";
import CardLoder from "@/components/Loader/CardLoder/CardLoder";
import { currentUser } from "@/Services/AuthService";
import CommentModal from "@/components/ProfilePage/Comment/CommentModal";

import { useGetComment } from "@/hooks/comment.hook";

interface data {
  data: TPostData;
  isLoading: boolean;
}
const HomePostCard: React.FC<data> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center ">
        <CardLoder></CardLoder>
      </div>
    );
  }
  // const contentRef = useRef<HTMLDivElement>(null);
  // const handleUser = async () => {
  //   const user = await currentUser();
  //   console.log(user._id);
  // };
  // handleUser();
  const [postid, setPostId] = useState("");
  const [showModal, setShowModal] = useState(false);
  // const [addComment] = useCreteCommentMutation();
  // const [page, setPage] = useState<number>(1);
  // const [hasMore, setHasMore] = useState<boolean>(true);

  const [upvoted, setUpvoted] = useState(false); // Track if the user has upvoted
  const [downvoted, setDownvoted] = useState(false);

  // Await the Promise here

  // const [postvote] = usePostVoteMutation();
  // const [deletePost] = useDeleteCommentMutation();

  const { data: comments, isLoading: comentLoader } = useGetComment(postid);

  if (comentLoader) {
    return (
      <span>
        <p>Loading</p>
      </span>
    );
  }
  console.log("comments");

  const handleOpenModal = (id: string) => {
    setPostId(id);
    setShowModal(true);
  };
  // console.log("post", comments);

  // const handleUpvote = async (postId: string) => {
  //   console.log("Post ID before API call:", postId);

  //   if (!postId) {
  //     console.error("Post ID is missing before calling postvote");
  //     return;
  //   }

  //   try {
  //     const payload = {
  //       id: postId,
  //       user: user?._id,
  //       vote: "upvote",
  //     };
  //     console.log("Payload to be sent to postvote:", payload);

  //     // Call the API
  //     const res = await postvote(payload);
  //     console.log("API response:", res);

  //     setUpvoted(!upvoted); // Toggle upvote state
  //     if (downvoted) setDownvoted(false); // If downvoted before, reset downvote
  //   } catch (error) {
  //     console.error("Error updating vote:", error);
  //   }
  // };

  // Handle downvote
  // const handleDownvote = async (postId: string) => {
  //   console.log(postId);

  //   const res = await postvote({
  //     id: postId,
  //     user: user?._id,
  //     vote: "downvote",
  //   });
  //   console.log(res);
  //   setDownvoted(!downvoted);
  //   if (upvoted) setUpvoted(false);
  // };
  // const handleAddComment = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget); // Get form data
  //   const text = formData.get("text") as string;
  //   const commentInfo = {
  //     user: user?._id,
  //     post: postid,
  //     text,
  //   };
  //   const tostid = toast.loading(" comment createing...");
  //   try {
  //     const res = await addComment(commentInfo); // Pass FormData to Redux action
  //     console.log("res", res);

  //     if (res.error) {
  //       toast.error("Something went wrong", { id: tostid });
  //     } else {
  //       toast.success("comment created successfully", { id: tostid });
  //     }
  //   } catch (error) {
  //     console.log("Error:", error);
  //   }
  //   // Prevent page reload on form submission
  // };
  // if (data?.data?.length === 0) {
  //   setHasMore(false); // If no more posts, stop fetching
  // }
  // const loadMore = () => {
  //   if (hasMore) {
  //     setPage((prevPage) => prevPage + 1); // Increment page to load more posts
  //   }
  // };

  // const handleShare = async (postId: string) => {
  //   const postUrl = `${window.location.origin}/posts/${postId}`; // Construct the post URL
  //   try {
  //     await navigator.clipboard.writeText(postUrl); // Copy URL to clipboard
  //     toast.success("Post URL copied to clipboard!"); // Notify user
  //   } catch (error) {
  //     console.error("Failed to copy: ", error);
  //     toast.error("Failed to copy URL"); // Notify user on error
  //   }
  // };

  // const generatePDF = async () => {
  //   if (contentRef.current) {
  //     const element = contentRef.current;

  //     const canvas = await html2canvas(element, { scale: 2 });
  //     const imgData = canvas.toDataURL("image/png");

  //     const pdf = new jsPDF();
  //     const imgWidth = 190; // Width of the image in mm
  //     const pageHeight = pdf.internal.pageSize.height;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;
  //     let heightLeft = imgHeight;

  //     let position = 0;

  //     pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;

  //     while (heightLeft >= 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
  //       heightLeft -= pageHeight;
  //     }

  //     // Save the PDF
  //     pdf.save(`gardening_tips_${new Date().toISOString()}.pdf`);
  //   }
  // };

  return (
    <div>
      {data?.data?.map((item: TPost) => (
        <div
          key={item?._id}
          className="max-w-xl mt-5 bg-white shadow-md rounded-lg overflow-hidden mb-6"
        >
          {/* Post Header */}
          <div className="flex justify-between items-center px-4 py-3">
            <Link href={`/userProfile/${item?.user?._id}`}>
              <div className="flex items-center">
                {item?.user?.image ? (
                  <>
                    {" "}
                    <Image
                      src={item?.user?.image}
                      alt="User profile"
                      className="w-10 h-10 rounded-full"
                      width={40}
                      height={40}
                    />
                  </>
                ) : (
                  <>
                    {" "}
                    <Image
                      src="https://i0.wp.com/jiggambia.com/wp-content/uploads/2024/01/19e156dd3f2d29d0b5e8b081729abe9b.jpg?fit=400%2C400&ssl=1"
                      alt="User profile"
                      className="w-10 h-10 rounded-full"
                      width={40}
                      height={40}
                    />
                  </>
                )}
                <div className="ml-3">
                  <h2 className="text-sm font-semibold">
                    {item?.user?.name}{" "}
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
            </Link>

            {/* 3 Dot Dropdown */}
            <div>
              {/* Dropdown logic for Edit/Delete goes here */}

              {/* <DropdownToggle
                postid={item?._id}
                userPostId={item.user?._id}
                userId={user?._id}
                currentCategory={item?.catagory}
                currentImage={item?.image}
                currentText={item?.text}
              ></DropdownToggle> */}
            </div>
          </div>

          {/* Post Content */}
          <div className="px-4">
            <p className="text-sm text-gray-700">{item?.text}</p>
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
                // onClick={() => handleUpvote(item?._id)}
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
                // onClick={() => handleDownvote(item?._id)}
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
                onClick={() => handleOpenModal(item?._id)}
                className="text-sm text-gray-500 hover:underline"
              >
                View Comments
              </button>
            </div>
            <div>
              <button
                // onClick={() => handleShare(item?._id)}
                className="flex items-center text-gray-600 hover:text-blue-500 space-x-1"
              >
                <FaShareAlt />
                <span>Share</span>
              </button>
              {/* <button
                  onClick={generatePDF}
                  className="flex mt-1 items-center text-gray-600 hover:text-blue-500 space-x-1"
                >
                  <FaFilePdf />
                  <span>Pdf</span>
                </button> */}
            </div>
          </div>

          {/* Comments Modal */}
          {showModal && (
            <CommentModal onClose={() => setShowModal(false)}>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">Comments</h3>

                {comments?.data.map((comment: Tcommet) => (
                  <div key={comment?._id} className="mb-4">
                    <div className="flex justify-between items-center">
                      <Image
                        className="rounded-full mr-3"
                        src={comment?.user.image}
                        height={40}
                        width={40}
                        alt="img"
                      ></Image>
                      <p className="text-gray-700 text-sm">{comment.text}</p>
                      <div className="flex space-x-2">
                        <button className="text-sm text-blue-500 hover:underline">
                          Edit
                        </button>
                        <button
                          // onClick={() => deletePost(comment?._id)}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="divider"></div>
                  </div>
                ))}

                <div className="mt-4">
                  <form>
                    {/* onSubmit={handleAddComment} */}
                    <input
                      type="text"
                      name="text"
                      id=""
                      placeholder="Write a comment..."
                      className="block p-3 rounded-xl"
                    />
                    <button
                      type="submit"
                      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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

export default HomePostCard;
