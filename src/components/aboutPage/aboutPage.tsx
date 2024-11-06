"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center py-10 px-4 container mx-auto mt-6">
      {/* About Us Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto text-center"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-primary">
          About Us
        </h1>

        {/* Image for About Us */}
        <motion.img
          src="https://i.ibb.co.com/kXyzN6H/3053975.jpg"
          alt="About Us"
          className="w-full h-48 sm:h-64 md:h-72 lg:h-96 object-cover rounded-lg shadow-md mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 px-2 sm:px-6 lg:px-0">
          Welcome to the Gardening Tips & Advice Platform, a community-driven
          hub for gardening enthusiasts and professionals alike. Our mission is
          to empower gardeners worldwide with the knowledge and tools to
          cultivate vibrant, sustainable, and beautiful gardens.
        </p>

        {/* Our Mission Section */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 w-full h-full"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-secondary">
            Our Mission
          </h2>

          {/* Image for Mission */}
          <motion.img
            src="https://ibb.co.com/Sn1VGj0"
            alt="Our Mission"
            className="w-full h-48 sm:h-64 md:h-72 lg:h-96 object-cover rounded-lg shadow-md mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          <p className="text-sm sm:text-base md:text-lg text-gray-500 px-2 sm:px-6 lg:px-0">
            We believe in fostering a community where everyone can learn, grow,
            and connect through the shared love of gardening. Our mission is to
            make gardening accessible, enjoyable, and enriching for everyone.
          </p>
        </motion.div>

        {/* Our Vision Section */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-secondary">
            Our Vision
          </h2>

          {/* Image for Vision */}
          <motion.img
            src="https://t3.ftcdn.net/jpg/02/39/52/06/360_F_239520607_abB3AakIrZozIAPgdVAMiMArLwi0uJTL.jpg"
            alt="Our Vision"
            className="w-full h-48 sm:h-64 md:h-72 lg:h-96 object-cover rounded-lg shadow-md mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          <p className="text-sm sm:text-base md:text-lg text-gray-500 px-2 sm:px-6 lg:px-0">
            We envision a world where every gardener, whether in a backyard,
            balcony, or farm, has access to the knowledge they need to succeed.
            By creating an interactive and supportive environment, we hope to
            inspire more people to grow their own green spaces and contribute to
            a greener planet.
          </p>
        </motion.div>

        {/* Meet the Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-secondary">
            Meet the Team
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-6 px-2 sm:px-6 lg:px-0">
            Our team consists of passionate gardeners, plant experts, and
            developers who are dedicated to building this platform. Together, we
            aim to create a resourceful, welcoming, and enriching experience for
            every user.
          </p>

          {/* Team Images */}
          <div className="flex flex-wrap justify-center space-x-0 sm:space-x-6 space-y-6 sm:space-y-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <Image
                src="https://media.maestramusic.org/wp-content/uploads/2020/06/02214307/41ADA658-CAF2-4108-818E-E918F044C810.jpeg"
                alt="Team Member 1"
                className=" rounded-full shadow-lg "
                height={125}
                width={100}
              />
              <p className="text-md text-gray-500 mt-2">John Doe</p>
              <p className="text-sm text-gray-400">Plant Expert</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMScACPxWBVVScJQVVPfB3ygSQabSqGgf60Q&s"
                alt=""
                className="  rounded-full shadow-lg lg:flex hidden"
                height={125}
                width={100}
              />
              <p className="text-md text-gray-500 mt-2 lg:flex hidden">
                Jane Smith
              </p>
              <p className="text-sm text-gray-400 lg:flex hidden">Developer</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1CFbzbCWlKp7bqG9CeXkvt9iYa8dwS4yYkg&s"
                alt="Team Member 3"
                className=" rounded-full shadow-lg"
                height={125}
                width={125}
              />
              <p className="text-md text-gray-500 mt-2">Alice Brown</p>
              <p className="text-sm text-gray-400">Horticulturist</p>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-8">
          <a href="/" className="btn btn-primary">
            Back to Home
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
