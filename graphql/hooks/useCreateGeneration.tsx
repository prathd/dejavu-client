import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const CREATE_GENERATION = gql`
  mutation createGeneration($data: CreateGenerationInput!) {
    createGeneration(data: $data) {
      name
      startYear
      endYear
    }
  }
`;

export const useCreateGeneration = () => {
  const [createGeneration] = useMutation(CREATE_GENERATION);

  return (name: string, startYear, endYear) => {
    return createGeneration({
      variables: {
        data: {
          name,
          startYear: parseInt(startYear, 10),
          endYear: parseInt(endYear, 10),
        },
      },
    });
  };
};
