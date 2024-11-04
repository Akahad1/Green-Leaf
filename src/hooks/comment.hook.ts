import { getComment } from "@/Services/Comment";
import { useQuery } from "@tanstack/react-query";

export const useGetComment = (postId: string) => {
  return useQuery({
    queryKey: ["comment", postId],
    queryFn: async () => await getComment(postId),
  });
};
