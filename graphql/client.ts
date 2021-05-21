import { GraphQLClient } from "graphql-request";
import { GRAPHQL_SERVER_URL, GRAPHQL_SERVER_OPTIONS } from "../shared/Constants";

const graphQLClient = new GraphQLClient(GRAPHQL_SERVER_URL, {
  ...(GRAPHQL_SERVER_OPTIONS as any),
});

export default graphQLClient;
