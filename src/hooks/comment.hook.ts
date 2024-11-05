import { createComment, deleteComment, getComment } from "@/Services/Comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

export const useGetComment = (postId: string) => {
  return useQuery({
    queryKey: ["comment", postId],
    queryFn: async () => await getComment(postId),
  });
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["comment"],
    mutationFn: async (postData) => await createComment(postData),
    onSuccess: () => {
      toast.success("Comment Create Successfully");
      queryClient.invalidateQueries({
        queryKey: ["comment"], // your query key
        exact: false, // whether to invalidate only exact matches
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["comment"],
    mutationFn: async (commentId) => await deleteComment(commentId),
    onSuccess: () => {
      toast.success("Comment deleted Successfully");
      queryClient.invalidateQueries({
        queryKey: ["comment"], // your query key
        exact: false, // whether to invalidate only exact matches
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
