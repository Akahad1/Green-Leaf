import { getUser } from "@/Services/User";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => await getUser(userId),
  });
};
