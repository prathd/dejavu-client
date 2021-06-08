import { useConfirmEmail } from "@app/graphql/hooks/user/useConfirmEmail";
import redirect from "@app/lib/redirect";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Confirmation() {
  const router = useRouter();
  const confirmEmail = useConfirmEmail();
  useEffect(() => {
    const getEmailConfirmation = async () => {
      if (router.asPath !== router.route) {
        try {
          const result = await confirmEmail(router.query.key as string);
          if (result) redirect({}, "/home");
        } catch {
          redirect({}, "/401");
        }
      }
    };
    getEmailConfirmation();
  }, [router]);

  return <></>;
}
