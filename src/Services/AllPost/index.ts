"use server";

import AxiosInstance from "@/lib/AuthInstanse";

export const getAllPost = async (catagory: string, searchParam: string) => {
  console.log("catagory", catagory);
  try {
    const { data } = await AxiosInstance.get(
      `/post?catagory=${catagory}&search=${searchParam}`
    );
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
