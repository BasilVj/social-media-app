import { gql, useQuery } from "@apollo/client";

export const GET_POSTS = gql`
  query getUserPosts($userId: String!) {
    getUserPosts(userId: $userId) {
      description
      imageUrl
      userId
      id
    }
  }
`;
