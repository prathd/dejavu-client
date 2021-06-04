import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { ME } from "@graphql/queries";
import redirect from "@app/lib/redirect";

const CHANGE_PASSWORD = gql`
  mutation changePassword($data: ChangePasswordInput!) {
    changePassword(data: $data) {
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
  }
`;

export const useChangePassword = client => {
  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    update(cache, { data: { changePassword } }) {
      cache.writeQuery({
        query: ME,
        data: { ...changePassword },
      });

      // Force a reload of all the current queries now that the user is logged in
      return client.cache.reset().then(() => {
        redirect({}, "/");
      });
    },
  });

  return (id: string, currentPassword: string, newPassword: string) =>
    changePassword({
      variables: {
        data: {
          id,
          currentPassword,
          newPassword,
        },
      },
    });
};
