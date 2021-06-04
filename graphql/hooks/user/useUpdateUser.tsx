import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { ME } from "@graphql/queries";
import redirect from "@app/lib/redirect";
import { Location } from "@components/UI/LocationInput";

const UPDATE_USER = gql`
  mutation updateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
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

export const useUpdateUser = client => {
  const [updateUser] = useMutation(UPDATE_USER, {
    update(cache, { data: { updateUser } }) {
      cache.writeQuery({
        query: ME,
        data: { ...updateUser },
      });

      // Force a reload of all the current queries now that the user is logged in
      return client.cache.reset().then(() => {
        redirect({}, "/");
      });
    },
  });

  return (
    id,
    firstName: string,
    lastName: string,
    phone: string,
    location: Location,
    subscribe: boolean
  ) =>
    updateUser({
      variables: {
        data: {
          id,
          firstName,
          lastName,
          phone,
          lat: location.lat,
          lng: location.lng,
          formattedAddress: location.formattedAddress,
          placeId: location.placeId,
          subscribe,
        },
      },
    });
};
