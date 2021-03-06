import React from "react";
import { withProfiler } from "@sentry/react";
import Link from "next/link";
import NavigationHOC from "@app/layouts/NavigationHOC";
import checkLoggedIn from "@app/lib/checkLoggedIn";
import redirect from "@app/lib/redirect";
import { initializeApollo } from "@lib/apollo";
import Button from "@app/components/UI/Button";
import { useLogout } from "@app/graphql/hooks/user/useLogout";
import { useApolloClient } from "@apollo/client";
import { Admin } from "@app/components/Admin";

const AdminPage = ({ loggedInUser }) => {
  const client = useApolloClient();
  const logout = useLogout(client);

  return (
    <NavigationHOC>
      <Link href="/">
        <Button>Home</Button>
      </Link>
      <Button onClick={logout}>Logout</Button>
      <Admin user={loggedInUser.me} />
    </NavigationHOC>
  );
};

AdminPage.getInitialProps = async context => {
  const apolloClient = initializeApollo(context);
  const { loggedInUser } = await checkLoggedIn(apolloClient);

  if (!loggedInUser.me) {
    // If already signed in, send them somewhere more useful
    redirect(context, "/");
  }

  return { loggedInUser };
};

export default withProfiler(AdminPage);
