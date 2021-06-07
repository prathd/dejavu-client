import { useApolloClient } from "@apollo/client";
import { useChangePassword } from "@app/graphql/hooks/user/useChangePassword";
import toaster from "@app/lib/toaster";
import React from "react";
import { useForm } from "react-hook-form";
import * as S from "../styled";

type PasswordChange = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export const ChangePassword = props => {
  const client = useApolloClient();
  const { user } = props;
  const { register, handleSubmit } = useForm<PasswordChange>();
  const changePassword = useChangePassword(client);
  const onSubmit = async (data: PasswordChange) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toaster.error("Old and New Passwords don't match");
      return;
    }
    try {
      await changePassword(user.id, data.currentPassword, data.newPassword);
    } catch (ex) {
      toaster.error(ex.message);
    }
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Input
        name="currentPassword"
        autoComplete="off"
        type="password"
        placeholder="Current Password"
        ref={register({ required: true })}
      />
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
