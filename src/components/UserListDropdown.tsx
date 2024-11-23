import React, { useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";
import useFetchFollowers from "../hooks/useFetchFollowers";
import { Follower } from "./Friends";

type UserListDropdown = {
  userId: string;
  setSelectedFollowers: React.Dispatch<React.SetStateAction<Follower[]>>;
};

type Options = {
  label: string;
  value: string;
};

const UserListDropdown = ({
  userId,
  setSelectedFollowers,
}: UserListDropdown) => {
  const [followers, setFollowers] = useState<Options[]>([]);
  const { followersData, followersLoading, followersRefetch } =
    useFetchFollowers(userId);

  const handleChange = (e: MultiValue<Options>) => {
    const filteredData = e.map((ev) => {
      return {
        username: ev.label,
        userId: ev.value,
      };
    });
    setSelectedFollowers(filteredData);
  };

  useEffect(() => {
    if (followersData) {
      const followersList = followersData.getFollowers.map(
        (follower: Follower) => ({
          label: follower.username,
          value: follower.userId,
        })
      );
      setFollowers(followersList);
    }
  }, [followersData]);

  return (
    <div>
      <Select
        options={followers}
        onChange={handleChange}
        name="users"
        isMulti
        className="mt-1 focus:border-[#2563eb] focus:border-2"
      />
    </div>
  );
};

export default UserListDropdown;
