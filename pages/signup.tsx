import React from "react";
import { withProfiler } from "@sentry/react";
import Link from "next/link";
import NavigationHOC from "@app/layouts/NavigationHOC";
import checkLoggedIn from "@app/lib/checkLoggedIn";
import redirect from "@app/lib/redirect";
import { initializeApollo } from "@lib/apollo";
import Button from "@app/components/UI/Button";
import { Signup } from "@app/components/Auth/Signup";

const SignupPage = () => {
  return (
    <NavigationHOC>
      <Link href="/">
        <Button>Home</Button>
      </Link>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
      <Signup />
    </NavigationHOC>
  );
};

SignupPage.getInitialProps = async context => {
  const apolloClient = initializeApollo(context);
  const { loggedInUser } = await checkLoggedIn(apolloClient);

  if (loggedInUser.me) {
    // If already signed in, send them somewhere more useful
    redirect(context, "/");
  }

  return { loggedInUser };
};

export default withProfiler(SignupPage);
