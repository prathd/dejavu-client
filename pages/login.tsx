import React from "react";
import { withProfiler } from "@sentry/react";
import Link from "next/link";
import NavigationHOC from "@app/layouts/NavigationHOC";
import checkLoggedIn from "@app/lib/checkLoggedIn";
import redirect from "@app/lib/redirect";
import { initializeApollo } from "@lib/apollo";
import Button from "@app/components/UI/Button";
import { Login } from "@app/components/Auth/Login";
import { NavigationBar } from "@app/components/Navigation";

const LoginPage = () => {
  return (
    <NavigationHOC>
      <NavigationBar>
        <Link href="/home">
          <Button>Home</Button>
        </Link>
        <Link href="/signup">
          <Button>Sign Up</Button>
        </Link>
      </NavigationBar>
      <Login />
    </NavigationHOC>
  );
};

LoginPage.getInitialProps = async context => {
  const apolloClient = initializeApollo(context);
  const { loggedInUser } = await checkLoggedIn(apolloClient);

  if (loggedInUser.me) {
    // If already signed in, send them somewhere more useful
    redirect(context, "/");
  }

  return { loggedInUser };
};

export default withProfiler(LoginPage);
