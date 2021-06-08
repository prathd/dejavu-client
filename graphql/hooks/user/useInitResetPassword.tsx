import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const CONFIRM_EMAIL = gql`
  mutation initResetPassword($email: String!) {
    initResetPassword(email: $email)
  }
`;

export const useInitResetPassword = () => {
  const [initResetPassword] = useMutation(CONFIRM_EMAIL);

  return (email: string) => {
    return initResetPassword({
      variables: {
        email,
      },
    });
  };
};
