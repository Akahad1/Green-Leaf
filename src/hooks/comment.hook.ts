import { createComment, getComment } from "@/Services/Comment";
import { useMutation } from "@tanstack/react-query";
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
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["comment"],
    mutationFn: async (postData) => await createComment(postData),
    onSuccess: () => {
      toast.success("Comment Create Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
