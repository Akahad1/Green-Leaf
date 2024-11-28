"use client";
import Link from "next/link";
import React from "react";
import { BsPostcard } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
interface TProps {
  user: {
    role: string;
    _id: string;
  };
}
const CommonDeshbord: React.FC<TProps> = ({ user }) => {
  return (
    <div>
      {user?.role === "user" ? (
        <div className=" lg:ml-10 ml-7 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
          <Link href="/deshbord/myContent">
            <div>
              <div className="border lg:border-slate-500 hover:bg-base-300  mb-10 bg-white p-10 w-80 h-60 ">
                <div className="flex justify-center mb-4">
                  <BsPostcard size={28} className=" mr-2 text-center mt-10 " />
                </div>
                <p className="text-black text-center text-xl"> MY Content</p>
              </div>
            </div>
          </Link>
          <Link href="/deshbord/myFollower">
            <div>
              <div className="border lg:border-slate-500 hover:bg-base-300 bg-white p-10 w-80 h-60 ">
                <div className="flex justify-center mb-4">
                  <LuUsers size={28} className="mr-2 text-center mt-10  " />
                </div>
                <p className="text-black text-center text-xl"> MY Content</p>
              </div>
            </div>
          </Link>
          <Link href="/deshbord/myFollowing">
            <div>
              <div className="border lg:border-slate-500 hover:bg-base-300 bg-white p-10 w-80 h-60 ">
                <div className="flex justify-center mb-4">
                  <LuUsers size={28} className="mr-2 text-center mt-10  " />
                </div>
                <p className="text-black text-center text-xl"> MY Following</p>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div className=" lg:ml-10 ml-7 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 ">
          <Link href="/deshbord/activiy">
            <div>
              <div className="border lg:border-slate-500 hover:bg-base-300  mb-10 bg-white p-10 w-80 h-60 ">
                <div className="flex justify-center mb-4">
                  <BsPostcard size={28} className=" mr-2 text-center mt-10 " />
                </div>
                <p className="text-black text-center text-xl"> Activiy</p>
              </div>
            </div>
          </Link>
          <Link href="/deshbord/allUser">
            <div>
              <div className="border lg:border-slate-500 hover:bg-base-300 bg-white p-10 w-80 h-60 ">
                <div className="flex justify-center mb-4">
                  <LuUsers size={28} className="mr-2 text-center mt-10  " />
                </div>
                <p className="text-black text-center text-xl"> My All User</p>
              </div>
            </div>
          </Link>
          {/* <Link href="/deshbord/myFollowing">
        <div>
          <div className="border lg:border-slate-500 hover:bg-base-300 bg-white p-10 w-80 h-60 ">
            <div className="flex justify-center mb-4">
              <LuUsers size={28} className="mr-2 text-center mt-10  " />
            </div>
            <p className="text-black text-center text-xl"> MY Following</p>
          </div>
        </div>
      </Link> */}
        </div>
      )}
    </div>
  );
};

export default CommonDeshbord;
