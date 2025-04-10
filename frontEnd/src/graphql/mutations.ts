// src/graphql/mutations.ts
import { gql } from "@apollo/client";

// Mutation pour login
export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

// Mutation pour register
export const REGISTER_USER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, password: $password, email: $email)
}
`;
