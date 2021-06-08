import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const CONFIRM_EMAIL = gql`
  mutation confirmEmail($key: String!) {
    confirmEmail(key: $key)
  }
`;

export const useConfirmEmail = () => {
  const [confirmEmail] = useMutation(CONFIRM_EMAIL);

  return (key: string) => {
    return confirmEmail({
      variables: {
        key,
      },
    });
  };
};
