import { useForm } from "react-hook-form";
import { useApolloClient } from "@apollo/client";
import { useLogin } from "@app/graphql/hooks/user/useLogin";
import * as S from "../../styled";
import toaster from "@app/lib/toaster";

type LoginInputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const client = useApolloClient();
  const login = useLogin(client);
  const { register, handleSubmit } = useForm<LoginInputs>();
  const onSubmit = async data => {
    try {
      await login(data.email, data.password);
    } catch (ex) {
      toaster.error(ex.message);
    }
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Input name="email" type="email" placeholder="Email" ref={register({ required: true })} />
      <S.Input
        name="password"
        type="password"
        autoComplete="off"
        placeholder="Password"
        ref={register({ required: true })}
      />
      <S.Input type="submit" />
    </S.Form>
  );
};
