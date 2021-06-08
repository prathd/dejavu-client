import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useGetResetPasswordUser } from "@app/graphql/hooks/user/useGetResetPasswordUser";
import NavigationHOC from "@app/layouts/NavigationHOC";
import { NavigationBar } from "@app/components/Navigation";
import Link from "next/link";
import Button from "@app/components/UI/Button";
import { ResetPasswordForm } from "@app/components/ResetPassword/ResetPasswordForm";
import redirect from "@app/lib/redirect";

export default function Confirmation() {
  const router = useRouter();
  const client = useApolloClient();
  const resetPassword = useGetResetPasswordUser(client);
  const [user, setUser] = useState({});
  const [redisKey, setRedisKey] = useState("");
  useEffect(() => {
    const getUser = async () => {
      if (router.asPath !== router.route) {
        try {
          const result = await resetPassword(router.query.key as string);
          setUser(result.data.getResetPasswordUser);
          setRedisKey(router.query.key as string);
        } catch {
          redirect({}, "/401");
        }
      }
    };
    getUser();
  }, [router]);

  return (
    <NavigationHOC>
      <NavigationBar>
        <Link href="/home">
          <Button>Home</Button>
        </Link>
        <Link href="/login">
          <Button>Log In</Button>
        </Link>
      </NavigationBar>
      <ResetPasswordForm user={user} redisKey={redisKey} />
    </NavigationHOC>
  );
}
