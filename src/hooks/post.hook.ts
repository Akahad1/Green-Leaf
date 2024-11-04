import { getAllPost } from "@/Services/AllPost";
import { IQurey } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPost = (catagory: string, searchParam: string) => {
  console.log("ten", catagory);
  return useQuery({
    queryKey: ["post", catagory, searchParam],
    queryFn: async () => await getAllPost(catagory, searchParam),
  });
};
