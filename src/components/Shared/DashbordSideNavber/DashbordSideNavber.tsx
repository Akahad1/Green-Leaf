import Link from "next/link";
import React, { useState } from "react";
import { CiLock } from "react-icons/ci";
import { FaAngleDown, FaChevronUp } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";

const DashbordSideNavber = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const [isPages, setIsPages] = useState(false);

  // Toggle function for handling the opening/closing of the p tags
  const toggleParagraphs = () => {
    setIsPages(!isPages);
  };
  const [isAuthorization, setIsAuthorization] = useState(false);

  const toggleAuthorization = () => {
    setIsAuthorization(!isAuthorization);
  };

  const [activeLink, setActiveLink] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveLink(index); // Set the clicked link as active
  };
  return (
    <div>
      <Link href="/deshbord">
        <li
          onClick={() => handleClick(1)}
          className={`cursor-pointer ${
            activeLink === 1
              ? "block  text-blue-700 px-3 py-2 rounded-md"
              : "block  px-3 py-2 rounded-md"
          } hover:text-blue-700`}
        >
          <MdOutlineSpaceDashboard size={24} className="inline mr-2 " />
          Dashboard
        </li>
      </Link>
      <div className="">
        <p
          onClick={toggleParagraphs}
          className="block  hover:text-blue-700 px-3 py-2 rounded-md"
        >
          <RiPagesLine size={24} className="inline mr-2 " />
          Pages
          {isPages ? (
            <FaChevronUp size={20} className="inline ml-2 " />
          ) : (
            <FaAngleDown size={18} className="inline ml-2 " />
          )}
        </p>

        <div className={`space-y-2 mt-1 ml-5 ${isPages ? "" : "hidden"}`}>
          <Link href="/contactUs">
            <li
              onClick={() => handleClick(8)}
              className={`cursor-pointer ${
                activeLink === 8
                  ? "block  text-blue-700 px-3 py-2 rounded-md"
                  : "block  px-3 py-2 rounded-md"
              } hover:text-blue-700`}
            >
              Contact Us
            </li>
          </Link>
          <Link href="/aboutUs">
            <li className="block  hover:text-blue-700 px-3 py-2 rounded-md">
              About Us
            </li>
          </Link>
        </div>
      </div>
      {/* 3 */}
      <div className="">
        <p
          onClick={toggleAuthorization}
          className="cursor-pointer block  hover:text-blue-700 px-3 py-2 rounded-md"
        >
          <CiLock size={24} className="inline mr-2 " />
          Authorization
          {isAuthorization ? (
            <FaChevronUp size={20} className="inline ml-2 " />
          ) : (
            <FaAngleDown size={18} className="inline ml-2 " />
          )}
        </p>

        <div
          className={`space-y-2 mt-1 ml-5 ${isAuthorization ? "" : "hidden"}`}
        >
          <Link href="/singup">
            <li
              onClick={() => handleClick(5)}
              className={`cursor-pointer ${
                activeLink === 5
                  ? "block  text-blue-700 px-3 py-2 rounded-md"
                  : "block  px-3 py-2 rounded-md"
              } hover:text-blue-700`}
            >
              Sing Up
            </li>
          </Link>
          <Link href="/login">
            <li
              onClick={() => handleClick(6)}
              className={`cursor-pointer ${
                activeLink === 6
                  ? "block  text-blue-700 px-3 py-2 rounded-md"
                  : "block  px-3 py-2 rounded-md"
              } hover:text-blue-700`}
            >
              Sing In
            </li>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashbordSideNavber;
