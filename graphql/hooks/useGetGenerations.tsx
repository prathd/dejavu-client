import gql from "graphql-tag";

const GET_GENERATIONS = gql`
  query getGenerations {
    getGenerations {
      id
      startYear
      endYear
      name
    }
  }
`;

export const useGetGenerations = client => {
  return () => client.query({ query: GET_GENERATIONS });
};
