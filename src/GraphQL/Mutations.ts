import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $userId: String!
    $username: String!
    $profilePic: String
  ) {
    createUser(userId: $userId, username: $username, profilePic: $profilePic) {
      userId
      username
      profilePic
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $userId: String!
    $description: String!
    $imageUrl: String!
  ) {
    createPost(
      userId: $userId
      description: $description
      imageUrl: $imageUrl
    ) {
      userId
      description
      imageUrl
    }
  }
`;

export const ADD_FOLLOWSER_MUTATION = gql`
  mutation addFollower(
    $currentUserId: String!
    $followerId: String!
    $followerUsername: String!
  ) {
    addFollower(
      currentUserId: $currentUserId
      followerId: $followerId
      followerUsername: $followerUsername
    ) {
      currentUserId
      followerId
      followerUsername
    }
  }
`;
