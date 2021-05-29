import gql from "graphql-tag";

const GET_MEMORIES = gql`
  query getMemories {
    getMemories {
      id
      title
      description
      year
      generations {
        id
        startYear
        endYear
        name
      }
      categories {
        id
        name
      }
      location {
        lat
        lng
        placeId
        formattedAddress
      }
      imageUrl
      videoUrl
    }
  }
`;

export const useGetMemories = client => {
  return () => client.query({ query: GET_MEMORIES });
};
