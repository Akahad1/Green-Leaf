"use client";
import React from "react";
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <div className="min-h-screen container mx-auto mt-6   bg-base-100 flex flex-col items-center justify-center py-10 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-primary"
      >
        Contact Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-sm sm:text-base md:text-xl text-gray-600 mb-8 text-center px-2 sm:px-6 lg:px-0"
      >
        We’re here to help! If you have any questions, concerns,
        <br /> or feedback, please fill out the form below or reach out to us
        directly.
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="bg-white border border-slate-600 shadow-lg rounded-lg p-6 max-w-md w-full"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="input input-bordered w-full"
            placeholder="Your name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="input input-bordered w-full"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Message
          </label>
          <textarea
            id="message"
            required
            className="textarea textarea-bordered w-full"
            rows={4}
            placeholder="Type your message here..."
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary w-full"
          type="submit"
        >
          Send Message
        </motion.button>
      </motion.form>

      {/* Support Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="mt-8 text-center"
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
          Contact Us Directly
        </h2>
        <p className="text-sm text-gray-600">
          Email: support@gardeningplatform.com
        </p>
        <p className="text-sm text-gray-600">Phone: (123) 456-7890</p>
      </motion.div>
    </div>
  );
};

export default ContactPage;
