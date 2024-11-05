"use server";

import AxiosInstance from "@/lib/AuthInstanse";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createComment = async (commentData: FieldValues): Promise<any> => {
  try {
    const { data } = await AxiosInstance.post(
      `/comment/createComment`,
      commentData
    );
    revalidateTag("comments");
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const deleteComment = async (commentId: string): Promise<any> => {
  try {
    const { data } = await AxiosInstance.delete(`/comment/${commentId}`);
    revalidateTag("comments");
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getComment = async (postId: string) => {
  const fetchOption = {
    next: {
      tags: ["comments"],
    },
  };
  const res = await fetch(`http://localhost:5000/api/a6/comment/${postId}`, {
    next: {
      tags: ["comments"],
    },
  });
  return res.json();
};
