import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const CREATE_MEMORY = gql`
  mutation createMemory($data: CreateMemoryInput!) {
    createMemory(data: $data) {
      title
      description
      location
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
    location: string,
    imageUrl: string,
    videoUrl: string
  ) => {
    return createMemory({
      variables: {
        data: {
          title,
          description,
          year: parseInt(year),
          generationNames,
          location,
          imageUrl,
          videoUrl,
        },
      },
    });
  };
};