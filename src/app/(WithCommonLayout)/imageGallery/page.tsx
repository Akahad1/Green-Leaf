import AllImageGallery from "@/components/ImageGarllyComponent/AllImageGallery/AllImageGallery";
import { currentUser } from "@/Services/AuthService";
import React from "react";

const page = async () => {
  const user = await currentUser();
  return (
    <div>
      <AllImageGallery userId={user?._id}></AllImageGallery>
    </div>
  );
};

export default page;