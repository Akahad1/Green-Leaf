"use client";
import { useDeletePost, useUpdatePost } from "@/hooks/post.hook";
import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

import { toast } from "sonner";

type DropdownToggleProps = {
  postid: string;
  currentText: string;
  currentImage: string;
  currentCategory: string;
  userPostId?: string;
  userId?: string;
};

const DropdownToggle: React.FC<DropdownToggleProps> = ({
  postid,
  userId,
  userPostId,
  currentText,
  currentImage,
  currentCategory,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // State for form fields in the edit modal
  const [text, setText] = useState(currentText);
  const [image, setImage] = useState(currentImage);
  const [category, setCategory] = useState(currentCategory);

  const { mutate: deletePost } = useDeletePost();
  const { mutate: updatePost, isSuccess } = useUpdatePost();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle edit modal open
  const handleEdit = () => {
    setIsEditModalOpen(true);
    setIsDropdownOpen(false);
  };

  // Function to handle edit form submit
  const handleEditSubmit = async () => {
    try {
      const updatedFields = {
        text,
        image,
        category,
      };
      const updateInfo = {
        data: {
          ...updatedFields,
        },
        postid,
      };

      updatePost(updateInfo);

      if (isSuccess) {
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="relative">
      {/* 3 Dot Dropdown Button */}
      <button
        className="text-gray-600 hover:text-gray-800"
        onClick={handleDropdownToggle}
      >
        <FaEllipsisH />
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
          <ul>
            {userId === userPostId ? (
              <>
                {" "}
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleEdit}
                >
                  Edit
                </li>
                <li
                  onClick={() => deletePost(postid)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Delete
                </li>
              </>
            ) : (
              <></>
            )}
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Favorite
            </li>
          </ul>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-20 bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl mb-4">Edit Post</h2>

            {/* Text Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Text
              </label>
              <textarea
                className="w-full p-2 border rounded"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            {/* Image Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            {/* Category Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded mr-2"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={handleEditSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownToggle;
