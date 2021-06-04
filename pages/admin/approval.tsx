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
import { MemoriesApproval } from "@app/components/MemoriesApproval";
import { NavigationBar } from "@app/components/Navigation";

const ApprovalPage = ({ loggedInUser }) => {
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
      <MemoriesApproval />
    </NavigationHOC>
  );
};

ApprovalPage.getInitialProps = async context => {
  const apolloClient = initializeApollo(context);
  const { loggedInUser } = await checkLoggedIn(apolloClient);

  if (!loggedInUser.me) {
    redirect(context, "/home");
  }

  return { loggedInUser };
};

export default withProfiler(ApprovalPage);
