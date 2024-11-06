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
    <div>
      <div className="relative max-w-sm mx-auto">
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
              className="rounded-lg object-cover border border-black"
            />
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white text-2xl"
              >
                &times;
              </button>
              <Image
                src={item.image}
                alt=""
                width={800}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
