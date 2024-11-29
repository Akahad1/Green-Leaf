"use client";
import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const CommentModal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-5"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 focus:outline-none hover:text-gray-800"
        >
          &times;
        </button>

        {/* Modal Content Area with Scroll */}
        <div className="max-h-96 overflow-y-auto">{children}</div>
      </motion.div>
    </motion.div>
  );
};

export default CommentModal;
