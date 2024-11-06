"use server";

import AxiosInstance from "@/lib/AuthInstanse";
import { profileImage, TFollow } from "@/types";

export const getUser = async (UserId: string): Promise<any> => {
  try {
    const { data } = await AxiosInstance.get(`/user/${UserId}`);

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const getAllUser = async () => {
  try {
    const { data } = await AxiosInstance.get(`/user`);

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const updateUserImage = async (
  profileInfo: profileImage
): Promise<any> => {
  try {
    const { data } = await AxiosInstance.put(
      `/user/image/${profileInfo.user}`,
      profileInfo.data
    );

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const updateUserCoverImage = async (
  profileInfo: profileImage
): Promise<any> => {
  try {
    const { data } = await AxiosInstance.put(
      `/user/cover/${profileInfo.user}`,
      profileInfo.data
    );

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const updateUserinfo = async (
  profileInfo: profileImage
): Promise<any> => {
  try {
    const { data } = await AxiosInstance.put(
      `/user/image/${profileInfo.user}`,
      profileInfo.data
    );

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const FollowUser = async (profileInfo: TFollow): Promise<any> => {
  try {
    const { data } = await AxiosInstance.put(
      `/user/${profileInfo.userId}`,
      profileInfo
    );

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
