// Make sure to await params if you're using dynamic route params
import UserProfilePages from "@/components/userProfileComponent/UserProfilePages/UserProfilePages";

const pages = async ({ params }: { params: any }) => {
  // Await the params before using its properties
  const { userId } = params;

  return (
    <div>
      <UserProfilePages UserId={userId}></UserProfilePages>
    </div>
  );
};

export default pages;
