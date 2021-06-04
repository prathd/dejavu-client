import gql from "graphql-tag";

const GET_USER = gql`
  query getUser($id: String!) {
    getUser(id: $id) {
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

export const useGetUser = client => {
  return id => client.query({ query: GET_USER, variables: { id } });
};
