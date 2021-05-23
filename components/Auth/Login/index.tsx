import { useForm } from "react-hook-form";
import { useApolloClient } from "@apollo/client";
import { useLogin } from "@app/graphql/hooks/useLogin";
import * as S from "../../styled";

type LoginInputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const client = useApolloClient();
  const login = useLogin(client);
  const { register, handleSubmit } = useForm<LoginInputs>();
  const onSubmit = data => login(data.email, data.password);

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Input name="email" placeholder="Email" ref={register({ required: true })} />
      <S.Input name="password" placeholder="Password" ref={register({ required: true })} />
      <S.Input type="submit" />
    </S.Form>
  );
};
