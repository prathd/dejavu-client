import React, { useEffect, useState } from "react";
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
import { useGetUser } from "@app/graphql/hooks/user/useGetUser";
import { UserPage } from "@app/components/UserPage";
import { useRouter } from "next/router";

const User = ({ loggedInUser }) => {
  const client = useApolloClient();
  const logout = useLogout(client);
  const getUser = useGetUser(client);
  const router = useRouter();
  const [user, setUser] = useState(loggedInUser.me);

  useEffect(() => {
    const init = async () => {
      setUser((await getUser(router.query.userid)).data.getUser);
    };
    init();
  }, []);

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
      <UserPage user={user} />
    </NavigationHOC>
  );
};

User.getInitialProps = async context => {
  const apolloClient = initializeApollo(context);
  const { loggedInUser } = await checkLoggedIn(apolloClient);

  if (!loggedInUser.me) {
    redirect(context, "/");
  }

  return { loggedInUser };
};

export default withProfiler(User);
