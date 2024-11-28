import CommonDeshbord from "@/components/userdeshbord/CommonDeshbord/CommonDeshbord";
import { currentUser } from "@/Services/AuthService";
import React from "react";

const page = async () => {
  const user = await currentUser();
  return (
    <div className="min-h-screen">
      <p className="lg:text-2xl text-xl pt-10 text-center ">
        Welcome to Dashboard
      </p>
      <div className="mt-20">
        <CommonDeshbord user={user}></CommonDeshbord>
      </div>
    </div>
  );
};

export default page;
