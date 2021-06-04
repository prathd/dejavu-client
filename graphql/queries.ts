import gql from "graphql-tag";

export const ME = gql`
  query me {
    me {
      id
      email
      firstName
      lastName
      phone
      birthday
      location {
        lat
        lng
        placeId
        formattedAddress
      }
      subscribe
    }
  }
`;

export const LOGOUT = gql`
  query logout {
    logout
  }
`;
