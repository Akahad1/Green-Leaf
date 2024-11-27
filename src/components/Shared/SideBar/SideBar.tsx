"use client";

import { useState } from "react";
import Link from "next/link";

import DeshbordNavber from "../DeshbordNavber/DeshbordNavber";
import { MdOutlineSpaceDashboard } from "react-icons/md";

import { FaUser } from "react-icons/fa";
import { BsPostcard } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import DashbordSideNavber from "../DashbordSideNavber/DashbordSideNavber";

export interface TRProps {
  user: {
    role: string;
    _id: string;
  };
  children: React.ReactNode; // or whatever type userId should be
}

const Sidebar: React.FC<TRProps> = ({ children, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [activeLink, setActiveLink] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveLink(index); // Set the clicked link as active
  };
  return (
    <div className="flex   pt-6 mt-[-15px] h-full">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex  lg:min-h-screen flex-col w-64 bg-white p-4 ">
        <nav className="space-y-4">
          {user?.role === "user" ? (
            <>
              <button className="btn btn-ghost text-xl mb-3">Green Leaf</button>

              <DashbordSideNavber></DashbordSideNavber>

              {/* user */}
              <div className=" cursor-pointer block hover:text-blue-700 ml-3 rounded-md">
                <FaUser size={24} className="inline mr-2 " />
                Users
              </div>

              <div className="ml-5">
                <Link href="/deshbord/myContent">
                  <li
                    onClick={() => handleClick(2)}
                    className={`cursor-pointer ${
                      activeLink === 2
                        ? "block  text-blue-700 px-3 py-2 rounded-md"
                        : "block  px-3 py-2 rounded-md"
                    } hover:text-blue-700`}
                  >
                    <BsPostcard size={24} className="inline mr-2 " />
                    My Content
                  </li>
                </Link>
                <Link href="/deshbord/myFollower">
                  <li
                    onClick={() => handleClick(3)}
                    className={`cursor-pointer ${
                      activeLink === 3
                        ? "block  text-blue-700 px-3 py-2 rounded-md"
                        : "block  px-3 py-2 rounded-md"
                    } hover:text-blue-700`}
                  >
                    <LuUsers size={24} className="inline mr-2 " /> My Followers
                  </li>
                </Link>

                <Link href="/deshbord/myFollowing">
                  <li
                    onClick={() => handleClick(4)}
                    className={`cursor-pointer ${
                      activeLink === 4
                        ? "block  text-blue-700 px-3 py-2 rounded-md"
                        : "block  px-3 py-2 rounded-md"
                    } hover:text-blue-700`}
                  >
                    <LuUsers size={24} className="inline mr-2 " /> My Following
                  </li>
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link href="/deshbord/allUser">
                <li className="block  hover:bg-blue-700 px-3 py-2 rounded-md">
                  All User
                </li>
              </Link>
              <Link href="/deshbord/activiy">
                <li className="block  hover:bg-blue-700 px-3 py-2 rounded-md">
                  Activiy
                </li>
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden  lg:hidden ">
        {/* <button className=" p-2 inline h-24" onClick={toggleSidebar}>
          {isOpen ? <FiX size={14} /> : <FiMenu size={14} />}
        </button> */}

        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4">
            <nav className="space-y-4 mt-20">
              {user?.role === "user" ? (
                <>
                  <DashbordSideNavber
                    toggleSidebar={toggleSidebar}
                  ></DashbordSideNavber>

                  {/* user */}
                  <div className=" cursor-pointer block hover:text-blue-700 ml-3 rounded-md">
                    <FaUser size={24} className="inline mr-2 " />
                    Users
                  </div>
                  <div className="ml-5">
                    <Link href="/deshbord/myContent">
                      <li
                        onClick={toggleSidebar}
                        className={`cursor-pointer ${
                          activeLink === 2
                            ? "block  text-blue-700 px-3 py-2 rounded-md"
                            : "block  px-3 py-2 rounded-md"
                        } hover:text-blue-700`}
                      >
                        <BsPostcard size={24} className="inline mr-2 " />
                        My Content
                      </li>
                    </Link>
                    <Link href="/deshbord/myFollower">
                      <li
                        onClick={toggleSidebar}
                        className={`cursor-pointer ${
                          activeLink === 3
                            ? "block  text-blue-700 px-3 py-2 rounded-md"
                            : "block  px-3 py-2 rounded-md"
                        } hover:text-blue-700`}
                      >
                        <LuUsers size={24} className="inline mr-2 " /> My
                        Followers
                      </li>
                    </Link>

                    <Link href="/deshbord/myFollowing">
                      <li
                        onClick={toggleSidebar}
                        className={`cursor-pointer ${
                          activeLink === 4
                            ? "block  text-blue-700 px-3 py-2 rounded-md"
                            : "block  px-3 py-2 rounded-md"
                        } hover:text-blue-700`}
                      >
                        <LuUsers size={24} className="inline mr-2 " /> My
                        Following
                      </li>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/deshbord/allUser">
                    <li
                      onClick={toggleSidebar}
                      className="block  hover:bg-blue-700 px-3 py-2 rounded-md"
                    >
                      All User
                    </li>
                  </Link>

                  <Link href="/deshbord/activiy">
                    <li
                      onClick={toggleSidebar}
                      className="block  hover:bg-blue-700 px-3 py-2 rounded-md"
                    >
                      Activiy
                    </li>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className=" w-full   min-h-screen ">
        <DeshbordNavber
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          userId={user?._id}
        ></DeshbordNavber>
        <div className="bg-[#F8FAFC] ">
          {" "}
          <div>{children}</div>
        </div>

        <p></p>
      </main>
    </div>
  );
};

export default Sidebar;
