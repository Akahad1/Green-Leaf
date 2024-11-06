"use server";

import AxiosInstance from "@/lib/AuthInstanse";
import { TPostvote, updateInfo } from "@/types";
import { FieldValues } from "react-hook-form";

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
export const getspecificUserPost = async (userId: string) => {
  try {
    const { data } = await AxiosInstance.get(`/post/${userId}`);
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const deletedPost = async (postid: string) => {
  try {
    const { data } = await AxiosInstance.delete(`/post/${postid}`);
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const updatePost = async (updateData: updateInfo) => {
  try {
    const { data } = await AxiosInstance.put(
      `/post/${updateData.postid}`,
      updateData.data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const Postvote = async (postVotedata: TPostvote) => {
  console.log("postid", postVotedata);
  try {
    const { data } = await AxiosInstance.put(
      `/post/${postVotedata.id}`,
      postVotedata,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const createPost = async (postData: FieldValues) => {
  try {
    const { data } = await AxiosInstance.post(`/post/createPost`, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
