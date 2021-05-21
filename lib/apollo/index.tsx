import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import fetch from "isomorphic-unfetch";
import { GRAPHQL_SERVER_URL, GRAPHQL_SERVER_OPTIONS } from "@app/shared/Constants";
import { CustomPageContext } from "@app/shared/types";
import { testVar } from "./reactiveVariables";

let apolloClient;

function createApolloClient(initialState: CustomPageContext) {
  const cookie = initialState?.req?.headers?.cookie;

  const authLink = setContext(() => {
    return {
      headers: {
        cookie,
      },
    };
  });

  const httpLink = new HttpLink({
    uri: GRAPHQL_SERVER_URL, // Server URL (must be absolute)
    ...GRAPHQL_SERVER_OPTIONS,
    fetch,
  });

  return new ApolloClient({
    name: "dejavu",
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      dataIdFromObject: o => (o.id ? `${o.__typename}-${o.id}` : null),
      typePolicies: {
        Query: {
          fields: {
            test: {
              read() {
                return testVar();
              },
            },
          },
        },
      },
    }).restore(initialState as any),
  });
}

export function initializeApollo(
  initialState: CustomPageContext
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient(initialState);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: CustomPageContext) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}

export default useApollo;
