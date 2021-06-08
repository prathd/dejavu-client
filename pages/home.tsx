import React from "react";
import { withProfiler } from "@sentry/react";
import { useApolloClient } from "@apollo/client";
import NavigationHOC from "@app/layouts/NavigationHOC";
import checkLoggedIn from "@app/lib/checkLoggedIn";
import { initializeApollo } from "@lib/apollo";
import Button from "@app/components/UI/Button";
import { useLogout } from "@app/graphql/hooks/user/useLogout";
import Link from "next/link";
import { NavigationBar } from "@app/components/Navigation";
import { Home } from "@app/components/Home";
import { VerificationStatusBanner } from "@app/components/VerificationStatusBanner";

const HomePage = ({ loggedInUser }) => {
  const client = useApolloClient();
  const logout = useLogout(client);

  return (
    <NavigationHOC>
      <NavigationBar>
        {loggedInUser.me !== undefined ? (
          <Button name="logout" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
        <Link href="/settings">
          <Button>Settings</Button>
        </Link>
      </NavigationBar>
      <VerificationStatusBanner isVerified={!loggedInUser.me || loggedInUser.me.isVerified} />
      <Home />
    </NavigationHOC>
  );
};

HomePage.getInitialProps = async context => {
  const apolloClient = initializeApollo(context);
  const { loggedInUser } = await checkLoggedIn(apolloClient);

  return { loggedInUser };
};

export default withProfiler(HomePage);
