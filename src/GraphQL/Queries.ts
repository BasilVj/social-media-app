import { gql, useQuery } from "@apollo/client";

export const GET_POSTS = gql`
  query getUserPosts($userId: String!) {
    getUserPosts(userId: $userId) {
      description
      imageUrl
      userId
      postedTime
    }
  }
`;

export const GET_USER = gql`
  query getCurrentUser($userId: String!) {
    getCurrentUser(userId: $userId) {
      userId
      username
      profilePic
      followers {
        userId
        username
      }
    }
  }
`;
