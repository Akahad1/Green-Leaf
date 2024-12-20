import RecentPost from "@/components/Groups/RecentPost/RecentPost";
import { currentUser } from "@/Services/AuthService";

const page = async () => {
  const user = await currentUser();

  return (
    <div>
      <h1 className="lg:ml-32"> Recent Post</h1>
      <div className="flex justify-center">
        <RecentPost currentUserId={user?._id}></RecentPost>
      </div>
    </div>
  );
};

export default page;
