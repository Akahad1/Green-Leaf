"use server";

import AxiosInstance from "@/lib/AuthInstanse";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const getComment = async (postId: string) => {
  const fetchOption = {
    next: {
      tags: ["comment"],
    },
  };
  const res = await fetch(
    `http://localhost:5000/api/a6/comment/${postId}`,
    fetchOption
  );
  return res.json();
};
export const createComment = async (commentData: FieldValues): Promise<any> => {
  try {
    const { data } = await AxiosInstance.post(
      `/comment/createComment`,
      commentData
    );
    revalidateTag("comment");
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
