import cookie from "cookie";
import { ApolloClient } from "@apollo/client";
import redirect from "@app/lib/redirect";
import toaster from "@app/lib/toaster";
import { LOGOUT } from "../queries";

export const useLogout = (client: ApolloClient<any>) => {
  return async () => {
    try {
      await client.query({ query: LOGOUT });
      document.cookie = cookie.serialize("token", "", {
        maxAge: -1, // Expire the cookie immediately
      });
      // Force a reload of all the current queries now that the user is
      // logged in, so we don't accidentally leave any state around.
      await client.cache.reset();
      // Redirect to a more useful page when signed out
      redirect({}, "/login");
    } catch (error) {
      toaster.error(error);
    }
  };
};
