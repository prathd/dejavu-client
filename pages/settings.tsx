import React from "react";
import { withProfiler } from "@sentry/react";
import Link from "next/link";
import NavigationHOC from "@app/layouts/NavigationHOC";
import checkLoggedIn from "@app/lib/checkLoggedIn";
import redirect from "@app/lib/redirect";
import { initializeApollo } from "@lib/apollo";
import Button from "@app/components/UI/Button";
import { NavigationBar } from "@app/components/Navigation";
import { useLogout } from "@app/graphql/hooks/user/useLogout";
import { useApolloClient } from "@apollo/client";
import { Settings } from "@app/components/Settings";
import { VerificationStatusBanner } from "@app/components/VerificationStatusBanner";

const SettingsPage = ({ loggedInUser }) => {
  const client = useApolloClient();
  const logout = useLogout(client);
  return (
    <NavigationHOC>
      <NavigationBar>
        <Button name="logout" onClick={logout}>
          Logout
        </Button>
        <Link href="/home">
          <Button name="home">Home</Button>
        </Link>
      </NavigationBar>
      <VerificationStatusBanner isVerified={loggedInUser.me.isVerified} />
      <Settings user={loggedInUser.me} />
    </NavigationHOC>
  );
};

SettingsPage.getInitialProps = async context => {
  const apolloClient = initializeApollo(context);
  const { loggedInUser } = await checkLoggedIn(apolloClient);

  if (!loggedInUser.me) {
    redirect(context, "/");
  }

  return { loggedInUser };
};

export default withProfiler(SettingsPage);
