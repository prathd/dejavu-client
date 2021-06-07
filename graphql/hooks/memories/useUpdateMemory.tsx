import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const UPDATE_MEMORY = gql`
  mutation updateMemory($data: UpdateMemoryInput!) {
    updateMemory(data: $data) {
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
      user {
        id
        email
        firstName
        lastName
        phone
        location {
          lat
          lng
          placeId
          formattedAddress
        }
      }
      approvalStatus
    }
  }
`;

export const useUpdateMemory = () => {
  const [updateMemory] = useMutation(UPDATE_MEMORY);

  return (
    id: string,
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
    videoUrl: string,
    userId: string,
    approvalStatus: string
  ) => {
    return updateMemory({
      variables: {
        data: {
          id,
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
          userId,
          approvalStatus,
        },
      },
    });
  };
};
