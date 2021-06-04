import gql from "graphql-tag";

const GET_CATEGORIES = gql`
  query getCategories {
    getCategories {
      id
      name
    }
  }
`;

export const useGetCategories = client => {
  return () => client.query({ query: GET_CATEGORIES });
};
