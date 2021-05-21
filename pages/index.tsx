import React from "react";
import { withProfiler } from "@sentry/react";
import { useApolloClient } from "@apollo/client";
import NavigationHOC from "@app/layouts/NavigationHOC";
import checkLoggedIn from "@app/lib/checkLoggedIn";
import redirect from "@app/lib/redirect";
import { initializeApollo } from "@lib/apollo";
import Button from "@app/components/UI/Button";
import { useLogout } from "@app/graphql/hooks/useLogout";

const Index = () => {
  const client = useApolloClient();
  const logout = useLogout(client);
  return (
    <NavigationHOC>
      <h1>You are logged in.</h1>
      <Button onClick={logout}>Logout</Button>
    </NavigationHOC>
  );
};

Index.getInitialProps = async context => {
  const apolloClient = initializeApollo(context);
  const { loggedInUser } = await checkLoggedIn(apolloClient);

  if (!loggedInUser.me) {
    // If not already signed in, send to sign in page
    redirect(context, "/login");
  }

  return { loggedInUser };
};

export default withProfiler(Index);
