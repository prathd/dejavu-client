import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";

export interface CustomPageContext extends NextPageContext {
  apolloClient?: ApolloClient<InMemoryCache>;
}
