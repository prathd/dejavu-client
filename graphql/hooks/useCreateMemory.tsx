import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const CREATE_MEMORY = gql`
  mutation createMemory($data: CreateMemoryInput!) {
    createMemory(data: $data) {
      title
      description
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

export const useCreateMemory = () => {
  const [createMemory] = useMutation(CREATE_MEMORY);

  return (
    title: string,
    description: string,
    year,
    generationNames: string,
    categoryNames: string,
    lat: string,
    lng: string,
    placeId: string,
    formattedAddress: string,
    imageUrl: string,
    videoUrl: string
  ) => {
    return createMemory({
      variables: {
        data: {
          title,
          description,
          year: parseInt(year, 10),
          generationNames,
          categoryNames,
          lat,
          lng,
          placeId,
          formattedAddress,
          imageUrl,
          videoUrl,
        },
      },
    });
  };
};
