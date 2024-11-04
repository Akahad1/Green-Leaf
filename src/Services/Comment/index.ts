"use server";

import AxiosInstance from "@/lib/AuthInstanse";

export const getComment = async (postId: string) => {
  console.log("postId", postId);
  try {
    const { data } = await AxiosInstance.get(`/comment/${postId}`);
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
