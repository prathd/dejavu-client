import { useInitResetPassword } from "@app/graphql/hooks/user/useInitResetPassword";
import redirect from "@app/lib/redirect";
import React from "react";
import { useForm } from "react-hook-form";
import * as S from "../styled";

interface ResetPasswordInputs {
  email: string;
}

export const ResetPassword = () => {
  const { register, handleSubmit } = useForm<ResetPasswordInputs>();
  const initResetPassword = useInitResetPassword();

  const onSubmit = async data => {
    await initResetPassword(data.email);
    redirect({}, "/");
  };
  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <p>Enter the email you registered with. An email will be sent to reset password</p>
      <S.Input name="email" type="email" placeholder="Email" ref={register({ required: true })} />
      <S.Input type="submit" />
    </S.Form>
  );
};
