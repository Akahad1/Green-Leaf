"use server";

import AxiosInstance from "@/lib/AuthInstanse";
import { updateInfo } from "@/types";

export const getAllPost = async (catagory: string, searchParam: string) => {
  try {
    const { data } = await AxiosInstance.get(
      `/post?catagory=${catagory}&search=${searchParam}`
    );
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const deletedPost = async (postid: string) => {
  console.log("postid", postid);
  try {
    const { data } = await AxiosInstance.delete(`/post/${postid}`);
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const updatePost = async (updateData: updateInfo) => {
  console.log("postid", updateData);
  try {
    const { data } = await AxiosInstance.put(`/post`, updateData);
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
