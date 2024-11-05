"use server";

import { Tcommet } from "@/types";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import CommentModal from "../Comment/CommentModal";
import { currentUser } from "@/Services/AuthService";
import { useAddComment, useDeleteComment } from "@/hooks/comment.hook";
import { getComment } from "@/Services/Getcomment";

interface IProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  postid: string;
}
const ShowComment = async ({ setShowModal, postid }: IProps) => {
  const { mutate: addComment, isPending } = useAddComment();
  const { mutate: deleteComment } = useDeleteComment();
  const { data: comments } = await getComment(postid);
  const handleAddComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget); // Get form data
    const text = formData.get("text") as string;
    const user = await currentUser();
    const commentInfo = {
      user: user?._id,
      post: postid,
      text,
    };

    console.log(commentInfo);
    addComment(commentInfo);
  };
  return (
    <div>
      <CommentModal onClose={() => setShowModal(false)}>
        <div className="p-4 inline">
          <h3 className="text-lg font-semibold mb-4 inline">Comments</h3>
          <div className="flex justify-end ">
            <p
              className="text-xl inline cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              X
            </p>
          </div>
          {comments?.data.map((comment: Tcommet) => (
            <div key={comment?._id} className="mb-4">
              <div className="flex justify-between items-center">
                {comment?.user?.image ? (
                  <>
                    {" "}
                    <Image
                      className="rounded-full mr-3"
                      src={comment?.user.image}
                      height={40}
                      width={40}
                      alt="img"
                    ></Image>
                  </>
                ) : (
                  <>
                    {" "}
                    <Image
                      className="rounded-full mr-3"
                      src="https://i0.wp.com/jiggambia.com/wp-content/uploads/2024/01/19e156dd3f2d29d0b5e8b081729abe9b.jpg?fit=400%2C400&ssl=1"
                      height={40}
                      width={40}
                      alt="img"
                    ></Image>
                  </>
                )}

                <p className="text-gray-700 text-sm">{comment.text}</p>
                <div className="flex space-x-2">
                  <button className="text-sm text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button
                    onClick={() => deleteComment(comment?._id)}
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
            <form onSubmit={handleAddComment}>
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
    </div>
  );
};

export default ShowComment;
