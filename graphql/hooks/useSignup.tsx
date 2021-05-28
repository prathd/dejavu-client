import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { ME } from "@graphql/queries";
import redirect from "@app/lib/redirect";
import { Location } from "@components/UI/LocationInput";

const SIGN_UP = gql`
  mutation signup($data: CreateUserInput!) {
    signup(data: $data) {
      id
      email
      firstName
      lastName
      phone
      location {
        lat
        lng
      }
    }
  }
`;

export const useSignup = client => {
  const [signup] = useMutation(SIGN_UP, {
    update(cache, { data: { signup } }) {
      cache.writeQuery({
        query: ME,
        data: { ...signup },
      });

      // Force a reload of all the current queries now that the user is logged in
      return client.cache.reset().then(() => {
        redirect({}, "/");
      });
    },
  });

  return (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    birthday: Date,
    location: Location,
    subscribe: boolean
  ) =>
    signup({
      variables: {
        data: {
          firstName,
          lastName,
          email,
          password,
          phone,
          birthday,
          lat: location.lat,
          lng: location.lng,
          formattedAddress: location.formattedAddress,
          placeId: location.placeId,
          subscribe,
        },
      },
    });
};
