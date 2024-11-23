import React, { useEffect, useState } from "react";
import FriendInfo from "./FriendInfo";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../GraphQL/Queries";
import { useNavigate } from "react-router-dom";

export type Follower = {
  userId: string;
  username: string;
};

const Friends = () => {
  const { currentUser } = useAuthRedirect();
  const [followers, setFollowers] = useState<Follower[]>([]);
  const userId = currentUser?.uid;
  const navigate = useNavigate();

  const { error, loading, data } = useQuery(GET_FOLLOWERS, {
    variables: { userId },
    skip: !userId,
  });

  useEffect(() => {
    if (data) {
      setFollowers(data.getFollowers);
      console.log(data.getFollowers);
    }
  }, [data]);

  return (
    <div
      className={`flex justify-center pt-9 bg-[#e6f7ff] ${
        followers.length > 0 ? "" : "h-screen items-center"
      }`}
    >
      {followers && userId && followers.length > 0 ? (
        <div className="w-[35%] h-[95vh] bg-white/70 shadow-md shadow-gray-300 rounded-md mb-5 overflow-y-scroll">
          <h2 className="text-3xl pt-4 ps-4">Friends</h2>
          {followers.map((follower, index) => (
            <FriendInfo
              setFollowers={setFollowers}
              follower={follower}
              currentUSerId={userId}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-[#e6f7ff] ">
          <div className="bg-white shadow-lg rounded-lg p-8 w-[45vw] text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              You don’t have any Followers
            </h1>
            <h2 className="text-gray-600 mb-6">
              Start adding friends to your network
            </h2>
            <button
              className="bg-blue-500 text-white font-medium py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              onClick={() => navigate("/feed")}
            >
              Add Friends
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Friends;
