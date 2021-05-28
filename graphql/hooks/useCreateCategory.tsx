import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const CREATE_CATEGORY = gql`
  mutation createCategory($data: CreateCategoryInput!) {
    createCategory(data: $data) {
      name
    }
  }
`;

export const useCreateCategory = () => {
  const [createCategory] = useMutation(CREATE_CATEGORY);

  return (name: string) => {
    return createCategory({
      variables: {
        data: {
          name,
        },
      },
    });
  };
};
