import React from "react";
import FriendInfo from "./FriendInfo";
import useAuthRedirect from "../hooks/useAuthRedirect";

const Friends = () => {
  const { currentUser } = useAuthRedirect();
  return (
    <div className="flex justify-center pt-9 bg-[#e6f7ff]">
      <div className="w-[35%] h-[95vh] bg-white/70 shadow-md shadow-gray-300 rounded-md mb-5 overflow-y-scroll">
        <h2 className="text-3xl pt-4 ps-4">Friends</h2>
        <FriendInfo />
        <FriendInfo />
        <FriendInfo />
        <FriendInfo />
        <FriendInfo />
        <FriendInfo />
        <FriendInfo />
        <FriendInfo />
        <FriendInfo />
        <FriendInfo />
        <FriendInfo />
        <FriendInfo />
        <FriendInfo />
        <FriendInfo />
        <FriendInfo />
        <FriendInfo />
        <FriendInfo />
        <FriendInfo />
        <FriendInfo />
        <FriendInfo />
      </div>
    </div>
  );
};

export default Friends;
