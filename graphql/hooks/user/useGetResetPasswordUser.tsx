import gql from "graphql-tag";

const GET_RESET_PASSWORD_USER = gql`
  query getResetPasswordUser($key: String!) {
    getResetPasswordUser(key: $key) {
      id
      email
    }
  }
`;

export const useGetResetPasswordUser = client => {
  return key => client.query({ query: GET_RESET_PASSWORD_USER, variables: { key } });
};
