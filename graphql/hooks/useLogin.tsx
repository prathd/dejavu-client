import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { ME } from "@graphql/queries";
import redirect from "@app/lib/redirect";

const LOGIN = gql`
  mutation login($data: UserInput!) {
    login(data: $data) {
      id
      email
      firstName
      lastName
    }
  }
`;

export const useLogin = client => {
  const [signin] = useMutation(LOGIN, {
    update(cache, { data: { signin } }) {
      cache.writeQuery({
        query: ME,
        data: { ...signin },
      });

      // Force a reload of all the current queries now that the user is logged in
      return client.cache.reset().then(() => {
        redirect({}, "/");
      });
    },
  });

  return (email: string, password: string) =>
    signin({
      variables: {
        data: {
          email,
          password,
        },
      },
    });
};
