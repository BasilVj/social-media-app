import { useQuery } from "@apollo/client";
import { GET_SUGGESTED_USERS } from "../GraphQL/Queries";

const useFetchSuggestedUsers = (userId: string) => {
  const { loading, data, refetch } = useQuery(GET_SUGGESTED_USERS, {
    variables: { userId },
    skip: !userId,
  });

  return { data, refetch, loading };
};

export default useFetchSuggestedUsers;
