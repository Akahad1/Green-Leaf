"use client";

import { TPost } from "@/types";
import Image from "next/image";
import React, { useState } from "react";

interface ImageCardProps {
  item: TPost; // Using item of type TPost
}

const ImageCard: React.FC<ImageCardProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative max-w-xs mx-auto rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow">
      {/* Image Card */}
      <div
        onClick={openModal}
        className="cursor-pointer transition-transform transform hover:scale-105"
      >
        {isModalOpen === true ? (
          <></>
        ) : (
          <Image
            src={item.image}
            alt="img"
            width={300}
            height={200}
            className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
          />
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-3xl hover:text-gray-300"
            >
              &times;
            </button>
            <Image
              src={item.image}
              alt="large-image"
              width={1200}
              height={800}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCard;
