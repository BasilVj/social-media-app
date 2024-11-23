import React, { useEffect, useState } from "react";
import FriendInfo from "./FriendInfo";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { useNavigate } from "react-router-dom";
import SuggestedFollowers from "./SuggestedFollowers";
import Loader from "./layout/Loader";
import useFetchFollowers from "../hooks/useFetchFollowers";

export type Follower = {
  userId: string;
  username: string;
};

const Friends = () => {
  const { currentUser } = useAuthRedirect();
  const [followers, setFollowers] = useState<Follower[]>([]);
  const userId = currentUser?.uid;
  const navigate = useNavigate();
  const { followersData, followersLoading, followersRefetch } =
    useFetchFollowers(userId ? userId : "");

  useEffect(() => {
    if (followersData) {
      setFollowers(followersData.getFollowers);
    }
  }, [followersData]);

  return (
    <>
      {!followersLoading ? (
        <div
          className={`flex md:justify-end justify-center items-center 
        flex-col md:items-end xl:items-end lg:items-center xl:flex-row gap-10 pt-9 bg-[#e6f7ff] 
        pe-3 xl:p-0 md:pe-16 xl:pe-0  ${
          followers.length > 0 ? "xl:h-screen" : "h-screen items-center"
        }`}
        >
          {followers && userId && followers.length > 0 ? (
            <div className="w-full md:w-[65%] xl:w-[35%] xl:h-[85vh] bg-white/70 shadow-md shadow-gray-300 rounded-md mb-5 overflow-y-scroll">
              <h2 className="text-3xl pt-4 ps-4 pb-2">Friends</h2>
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
              <div className="bg-white shadow-lg rounded-lg p-8 w-full xl:w-[40vw] text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  You don’t have any Followers
                </h1>
                <h2 className="text-gray-600 mb-6">
                  Start adding friends to your network
                </h2>
              </div>
            </div>
          )}

          {currentUser?.uid !== "" && (
            <div className=" w-full md:w-[65%] xl:w-[35%]">
              <SuggestedFollowers
                userId={currentUser?.uid!}
                setFollowers={setFollowers}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-screen justify-center items-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Friends;
