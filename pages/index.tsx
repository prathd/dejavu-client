import React, { useEffect } from "react";
import { withProfiler } from "@sentry/react";
import { useApolloClient } from "@apollo/client";
import NavigationHOC from "@app/layouts/NavigationHOC";
import checkLoggedIn from "@app/lib/checkLoggedIn";
import { initializeApollo } from "@lib/apollo";
import Button from "@app/components/UI/Button";
import { useLogout } from "@app/graphql/hooks/user/useLogout";
import Link from "next/link";
import { InitializeUser } from "@app/components/Landing";
import { useCookies } from "react-cookie";
import redirect from "@app/lib/redirect";

const Index = ({ loggedInUser }) => {
  const client = useApolloClient();
  const logout = useLogout(client);
  const [cookies] = useCookies(["birthday", "city"]);

  useEffect(() => {
    if (cookies.birthday && cookies.city) {
      redirect({}, "/home");
    }
  }, [cookies]);

  return (
    <NavigationHOC>
      {loggedInUser.me !== undefined ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      )}
      {!cookies.birthday || !cookies.city ? <InitializeUser /> : null}
    </NavigationHOC>
  );
};

Index.getInitialProps = async context => {
  const apolloClient = initializeApollo(context);
  const { loggedInUser } = await checkLoggedIn(apolloClient);

  return { loggedInUser };
};

export default withProfiler(Index);
