"use server";

import AxiosInstance from "@/lib/AuthInstanse";
import { TPostvote, updateInfo } from "@/types";
import { FieldValues } from "react-hook-form";

export const getAllPost = async (
  catagory: string,
  searchParam: string,
  premiumParam: string
) => {
  try {
    const { data } = await AxiosInstance.get(
      `/post?catagory=${catagory}&search=${searchParam}&premium=${premiumParam}`
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
export const getGroupPost = async (groupId: string) => {
  try {
    const { data } = await AxiosInstance.get(`/post/group-post/${groupId}`);
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const getAllGroupPost = async () => {
  try {
    const { data } = await AxiosInstance.get(`/post/group/allpost`);

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
      updateData.data
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
      postVotedata
    );
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const createPost = async (postData: FieldValues) => {
  console.log("interner", postData);
  try {
    const { data } = await AxiosInstance.post(`/post/createPost`, postData);
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
