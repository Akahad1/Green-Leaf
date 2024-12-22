"use server";
import AxiosInstance from "@/lib/AuthInstanse";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createGroup = async (groupData: FieldValues): Promise<any> => {
  try {
    const { data } = await AxiosInstance.post(
      "/groups/create-group",
      groupData
    );
    revalidateTag("group");
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getSpecificMyGroup = async (
  userId: string,
  groupId: string
): Promise<any> => {
  try {
    const { data } = await AxiosInstance.get(
      `/groups/${userId}/group/${groupId}`
    );

    revalidateTag("group");
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const updateSpecificMyGroup = async (
  userId: string,
  groupId: string,
  groupData: any
): Promise<any> => {
  try {
    const { data } = await AxiosInstance.put(
      `/groups/${userId}/group/${groupId}`,
      groupData
    );

    revalidateTag("group");
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const getMyGroup = async (userId: string): Promise<any> => {
  try {
    const { data } = await AxiosInstance.get(`/groups/${userId}`);
    revalidateTag("group");
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const getNotInvolvedGroup = async (userId: string): Promise<any> => {
  try {
    const { data } = await AxiosInstance.get(`/groups/not-involved/${userId}`);

    revalidateTag("group");
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const sendInviteRequest = async (
  groupId: string,
  userId: string
): Promise<any> => {
  try {
    const { data } = await AxiosInstance.post(
      `/groups/invite/${groupId}/${userId}`
    );
    console.log("internal", data);
    revalidateTag("group");
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
export const memberApproval = async (
  groupId: string,
  requestId: string,
  status: string
): Promise<any> => {
  console.log(requestId);
  console.log("g", groupId);
  try {
    const { data } = await AxiosInstance.post(
      `/groups/${groupId}/approv/${requestId}`,
      { action: status }
    );
    console.log("internal", data);
    revalidateTag("group");
    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
