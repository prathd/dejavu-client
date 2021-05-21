import { ME } from "@graphql/queries";

export default function checkLoggedIn(apolloClient) {
  return apolloClient
    .query({
      query: ME,
      fetchPolicy: "network-only",
    })
    .then(({ data: { me: user } }) => {
      if (user && process.browser) {
        const heapInstance = (window as any).heap;

        heapInstance.identify(user.id);
        heapInstance.addUserProperties({ ...user, password: user.password ? "******" : null });
      }

      if (user) {
        return { loggedInUser: { me: user } };
      }

      return { loggedInUser: {} };
    })
    .catch(error => {
      console.error(`[Check Logged In Error] ${error}`);
      return { loggedInUser: {} };
    });
}
