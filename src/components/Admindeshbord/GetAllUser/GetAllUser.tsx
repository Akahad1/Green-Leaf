"use client";

import CardLoder from "@/components/Loader/CardLoder/CardLoder";
import { useGetAllUser } from "@/hooks/user.hook";
import { TUser } from "@/types";
import Image from "next/image";
import React from "react";

const GetAllUser = () => {
  const { data: AllUser, isLoading } = useGetAllUser();
  if (isLoading) {
    return <CardLoder></CardLoder>;
  }
  console.log("getall", AllUser);
  return (
    <div className="lg:flex lg:justify-center">
      <div>
        <div className="text-xl text-center mt-4 mb-5">All User</div>
        {AllUser?.data?.map((item: TUser) => (
          <div key={item._id} className="overflow-x-auto lg:ml-10 ">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <td>
                    <div className="flex items-center gap-3 w-52">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          {item?.image ? (
                            <Image
                              src={item?.image}
                              height={20}
                              width={20}
                              alt="name"
                            ></Image>
                          ) : (
                            <Image
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqtktl3g6wWkAzvUAi32yzYgb-jZ0-Pn0sQ&s"
                              height={20}
                              width={20}
                              alt="name"
                            ></Image>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <p className="font-bold w-52">{item?.name}</p>
                  </td>
                  <td>
                    <p className="font-bold w-52">{item?.email}</p>
                  </td>
                </tr>
                {/* row 2 */}

                {/* row 3 */}

                {/* row 4 */}
              </tbody>
              {/* <div className="divider w-full"></div> */}
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllUser;
