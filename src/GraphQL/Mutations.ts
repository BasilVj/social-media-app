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
