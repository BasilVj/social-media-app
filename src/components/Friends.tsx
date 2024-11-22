import React, { useEffect, useState } from "react";
import FriendInfo from "./FriendInfo";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { useQuery } from "@apollo/client";
import { GET_FOLLOWERS } from "../GraphQL/Queries";
import { appUser } from "../context/UserContext";

export type Follower = {
  userId: string;
  username: string;
};

const Friends = () => {
  const { currentUser } = useAuthRedirect();
  const [followers, setFollowers] = useState<Follower[]>([]);
  const userId = currentUser?.uid;

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
    <div className="flex justify-center pt-9 bg-[#e6f7ff]">
      <div className="w-[35%] h-[95vh] bg-white/70 shadow-md shadow-gray-300 rounded-md mb-5 overflow-y-scroll">
        <h2 className="text-3xl pt-4 ps-4">Friends</h2>
        {followers &&
          userId &&
          followers.length > 0 &&
          followers.map((follower, index) => (
            <FriendInfo
              setFollowers={setFollowers}
              follower={follower}
              currentUSerId={userId}
              key={index}
            />
          ))}
      </div>
    </div>
  );
};

export default Friends;
