import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { ME } from "@graphql/queries";
import redirect from "@app/lib/redirect";

const RESET_PASSWORD = gql`
  mutation resetPassword($data: ResetPasswordInput!) {
    resetPassword(data: $data) {
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
      isVerified
    }
  }
`;

export const useResetPassword = client => {
  const [resetPassword] = useMutation(RESET_PASSWORD, {
    update(cache, { data: { resetPassword } }) {
      cache.writeQuery({
        query: ME,
        data: { ...resetPassword },
      });

      // Force a reload of all the current queries now that the user is logged in
      return client.cache.reset().then(() => {
        redirect({}, "/");
      });
    },
  });

  return (id: string, key: string, newPassword: string) =>
    resetPassword({
      variables: {
        data: {
          id,
          key,
          newPassword,
        },
      },
    });
};
