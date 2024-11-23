import React, { useEffect, useState } from "react";
import { Follower } from "./Friends";
import useFetchUserById from "../hooks/useFetchUserById";
import { useMutation } from "@apollo/client";
import { REMOVE_FOLLOWER_MUTATION } from "../GraphQL/Mutations";

type FriendInfo = {
  follower: Follower;
  currentUSerId: string;
  setFollowers: React.Dispatch<React.SetStateAction<Follower[]>>;
};

const FriendInfo = ({ follower, currentUSerId, setFollowers }: FriendInfo) => {
  const { data } = useFetchUserById(follower.userId);
  const [username, setUsername] = useState<string>("");
  const [profilePic, setProfilePic] = useState<string>("");
  const [followerCount, setFollowerCount] = useState<number>();
  const [removeFollower] = useMutation(
    REMOVE_FOLLOWER_MUTATION
  );
  useEffect(() => {
    if (data) {
      setFollowerCount(data.getCurrentUser.followers.length);
      setUsername(data.getCurrentUser.username);
      setProfilePic(data.getCurrentUser?.profilePic);
    }
  }, [data]);

  const handleUserUnfollow = async () => {
    try {
      const { data } = await removeFollower({
        variables: {
          currentUserId: currentUSerId,
          followerId: follower.userId,
        },
      });

      if (data?.removeFollower?.followers) {
        setFollowers(data.removeFollower.followers); // Update the state
      } else {
        console.log("No followers found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-2 border-b border-b-gray-100 p-4 w-full">
      <div className={`w-12 relative`}>
        <div className="rounded-full overflow-hidden">
          <img src={profilePic} alt="" className="w-full" />
        </div>
      </div>
      <div>
        <h3 className="font-bold text-xl">{username}</h3>
        <div className="text-sm leading-3">{followerCount} friends</div>
      </div>
      <button
        className="ml-auto bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
        onClick={handleUserUnfollow}
      >
        Unfollow
      </button>
    </div>
  );
};

export default FriendInfo;
