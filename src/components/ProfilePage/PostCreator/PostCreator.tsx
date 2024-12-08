"use client";
import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import Image from "next/image";
import Link from "next/link";
import { ProfileCommonPageProps } from "../ProfileCommonPage/ProfileCommonPage";
import { useCreatePost } from "@/hooks/post.hook";
import { useGetUser } from "@/hooks/user.hook";

const PostEditorModal: React.FC<ProfileCommonPageProps> = ({ userId }) => {
  const { mutate: addPost, isSuccess } = useCreatePost();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [images, setImages] = useState<File[]>([]);
  const [category, setCategory] = useState(""); // State for category
  const [isPremium, setIsPremium] = useState(false); // State for premium toggl
  const { data: userData, isLoading } = useGetUser(userId);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditorState(EditorState.createEmpty());
    setImages([]);
    setCategory("");
    setIsPremium(false);
  };

  const onChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handlePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const postContent = contentState.getPlainText();

    const formData = new FormData();
    formData.append("user", userId);
    formData.append("text", postContent);
    formData.append("catagory", category);
    formData.append("premium", String(isPremium));

    if (images.length > 0) {
      formData.append("image", images[0]);
    }

    try {
      addPost(formData);
      closeModal();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="relative">
      <div>
        <div className="w-12 mt-3 bg-gray-200"></div>
        <div className="w-full max-w-lg lg:max-w-xl  flex p-4 rounded-lg shadow-xl bg-gradient-to-r  lg:mr-20 cursor-pointer hover:shadow-2xl transition-all">
          {userData?.data.image ? (
            <Link href="/profile">
              <div className="avatar">
                <div className="rounded-full w-12  mr-6 lg:mr-16 shadow-md">
                  <img src={userData?.data?.image} />
                </div>
              </div>
            </Link>
          ) : (
            <Link href="/profile">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqtktl3g6wWkAzvUAi32yzYgb-jZ0-Pn0sQ&s"
                alt="Profile Image"
                width={48}
                height={48}
                className="rounded-full mr-6 lg:mr-16 shadow-md"
              />
            </Link>
          )}
          <input
            onClick={openModal}
            type="text"
            placeholder="What's on your mind?"
            className="border rounded-xl bg-white bg-opacity-70 p-2 placeholder-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all w-full lg:w-96"
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 lg:mx-0 p-5 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all">
          <div className="bg-white p-8 rounded-lg max-w-2xl w-full md:max-w-4xl sm:w-full shadow-lg">
            <form onSubmit={handlePost}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-gray-700">
                  Create Post
                </h3>
                <button
                  type="button"
                  className="text-gray-600 text-2xl hover:text-gray-800"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </div>

              <div className="bg-gray-100 border border-gray-300 p-4 rounded-lg min-h-[150px] shadow-inner">
                <Editor
                  editorState={editorState}
                  onChange={onChange}
                  handleKeyCommand={handleKeyCommand}
                  placeholder="Share your thoughts..."
                />
              </div>

              <div className="mt-2 flex space-x-4">
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 text-sm transition"
                  onClick={() => toggleInlineStyle("BOLD")}
                >
                  Bold
                </button>
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 text-sm transition"
                  onClick={() => toggleInlineStyle("ITALIC")}
                >
                  Italic
                </button>
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-200 rounded-full hover:bg-gray-300 text-sm transition"
                  onClick={() => toggleInlineStyle("UNDERLINE")}
                >
                  Underline
                </button>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 font-semibold">
                  Attach Images:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="mt-2 w-full"
                />
                <div className="flex flex-wrap mt-4 space-x-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="preview"
                        className="w-24 h-24 object-cover rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => removeImage(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 font-semibold">
                  Select Category:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border border-gray-300 p-2 rounded-lg w-full bg-white shadow-md"
                  required
                >
                  <option value="Fruits">Fruits</option>
                  <option value="Herbs">Herbs</option>
                  <option value="Flowers">Flowers</option>
                  <option value="Vegetables">Vegetables</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-gray-700 font-semibold">
                  Premium Post:
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isPremium}
                    onChange={(e) => setIsPremium(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">
                    {isPremium ? "Premium" : "Regular"}
                  </span>
                </div>
              </div>

              <div className="mt-6 text-right">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostEditorModal;
