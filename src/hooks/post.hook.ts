import {
  createPost,
  deletedPost,
  getAllPost,
  getspecificUserPost,
  Postvote,
  updatePost,
} from "@/Services/AllPost";
import { TPostvote, updateInfo } from "@/types";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useGetAllPost = (
  catagory: string,
  searchParam: string,
  premiumParam: string
) => {
  return useQuery({
    queryKey: ["post", catagory, searchParam],
    queryFn: async () => await getAllPost(catagory, searchParam, premiumParam),
  });
};
export const useGetSpecificUserPost = (userId: string) => {
  return useQuery({
    queryKey: ["post", userId],
    queryFn: async () => await getspecificUserPost(userId),
  });
};
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["post"],
    mutationFn: async (postid) => await deletedPost(postid),
    onSuccess: () => {
      toast.success("post deleted Successfully");
      queryClient.invalidateQueries({
        queryKey: ["post"], // your query key
        exact: false, // whether to invalidate only exact matches
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, updateInfo>({
    mutationKey: ["post"],
    mutationFn: async (updateData) => await updatePost(updateData),
    onSuccess: () => {
      toast.success("post Update Successfully");
      queryClient.invalidateQueries({
        queryKey: ["post"], // your query key
        exact: false, // whether to invalidate only exact matches
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const usePostVote = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, TPostvote>({
    mutationKey: ["post"],
    mutationFn: async (postData) => await Postvote(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post"], // your query key
        exact: false, // whether to invalidate only exact matches
      });
    },
    onError: (error) => {},
  });
};
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["post"],
    mutationFn: async (updateData) => await createPost(updateData),
    onSuccess: () => {
      toast.success("post Create Successfully");
      queryClient.invalidateQueries({
        queryKey: ["post"], // your query key
        exact: false, // whether to invalidate only exact matches
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
