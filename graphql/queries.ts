import gql from "graphql-tag";

export const ME = gql`
  query me {
    me {
      id
      email
      firstName
      lastName
    }
  }
`;

export const LOGOUT = gql`
  query logout {
    logout
  }
`;
