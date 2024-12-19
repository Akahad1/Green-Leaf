import Image from "next/image";
import React from "react";

interface TReq {
  _id: string;
  user: {
    _id: string;
    name: string;
    image: string | null;
  };
}

type HandleRequest = (id: string, action: string) => void;

interface GroupManagmentProps {
  handleRequest: HandleRequest;
  requests: TReq[];
}

const GroupManagment: React.FC<GroupManagmentProps> = ({
  handleRequest,
  requests,
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800">Management</h2>
      <div>
        <h3 className="text-lg mb-4">Pending Requests</h3>
        {requests.map((req) => (
          <div key={req._id} className="flex mb-4 border p-3 rounded-md">
            {/* User's Cover Image */}
            {req.user.image ? (
              <Image
                src={req.user.image}
                alt="User profile"
                className="w-10 h-10 rounded-full"
                width={50}
                height={50}
              />
            ) : (
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqtktl3g6wWkAzvUAi32yzYgb-jZ0-Pn0sQ&s"
                alt="User profile"
                className="w-10 h-10 rounded-full"
                width={50}
                height={50}
              />
            )}

            {/* User's Name */}
            <div>
              <p className="text-md ml-3 mt-2 font-medium">{req.user.name}</p>
            </div>

            {/* Action Buttons */}
            <div className="lg:ml-96 justify-end ml-7 mt-2 space-x-3">
              <button
                onClick={() => handleRequest(req.user._id, "accept")}
                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={() => handleRequest(req.user._id, "reject")}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupManagment;
