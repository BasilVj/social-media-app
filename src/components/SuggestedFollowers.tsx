import React, { useEffect, useState } from "react";
import Accounts from "./Accounts";
import useFetchSuggestedUsers from "../hooks/useFetchSuggestedUsers";
import { appUser } from "../context/UserContext";
import { ApolloQueryResult, OperationVariables } from "@apollo/client";
import { Follower } from "./Friends";

type SuggestedFollowers = {
  userId: string;
  setFollowers: React.Dispatch<React.SetStateAction<Follower[]>>;
};

const SuggestedFollowers = ({ userId, setFollowers }: SuggestedFollowers) => {
  const [suggestedUsers, setSuggestedUsers] = useState<appUser[]>();
  const { data, loading } = useFetchSuggestedUsers(userId);
  useEffect(() => {
    if (data) {
      setSuggestedUsers(data.getSuggestUsers);
    }
  }, [data]);

  return (
    <div className="mb-4">
      <h3 className="pb-3">Suggested for you</h3>
      <div className="h-[79vh] rounded-lg shadow-lg overflow-y-scroll">
        {suggestedUsers &&
          suggestedUsers.length > 0 &&
          suggestedUsers.map((user, index) => (
            <Accounts
              user={user}
              currentUserId={userId}
              setSuggestedUsers={setSuggestedUsers}
              setFollowers={setFollowers}
              key={index}
            />
          ))}
      </div>
    </div>
  );
};

export default SuggestedFollowers;
