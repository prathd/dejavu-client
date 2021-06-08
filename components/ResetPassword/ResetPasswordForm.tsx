import { useApolloClient } from "@apollo/client";
import { useResetPassword } from "@app/graphql/hooks/user/useResetPassword";
import toaster from "@app/lib/toaster";
import React from "react";
import { useForm } from "react-hook-form";
import * as S from "../styled";

type ResetPasswordInput = {
  newPassword: string;
  confirmNewPassword: string;
};

export const ResetPasswordForm = ({ user, redisKey }) => {
  const client = useApolloClient();
  const { register, handleSubmit } = useForm<ResetPasswordInput>();
  const resetPassword = useResetPassword(client);
  const onSubmit = async (data: ResetPasswordInput) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toaster.error("Old and New Passwords don't match");
      return;
    }
    try {
      await resetPassword(user.id, redisKey, data.newPassword);
    } catch (ex) {
      toaster.error(ex.message);
    }
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Input
        name="newPassword"
        autoComplete="off"
        type="password"
        placeholder="New Password"
        ref={register({ required: true })}
      />
      <S.Input
        name="confirmNewPassword"
        autoComplete="off"
        type="password"
        placeholder="Confirm New Password"
        ref={register({ required: true })}
      />
      <S.Input type="submit" />
    </S.Form>
  );
};
