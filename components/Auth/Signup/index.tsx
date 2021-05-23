import { useApolloClient } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useSignup } from "@app/graphql/hooks/useSignup";
import * as S from "../../styled";

type SignupInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
};

export const Signup = () => {
  const client = useApolloClient();
  const signup = useSignup(client);
  const { register, handleSubmit } = useForm<SignupInputs>();
  const onSubmit = data =>
    signup(data.firstName, data.lastName, data.email, data.password, data.phone);

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Input name="firstName" placeholder="First Name" ref={register({ required: true })} />
      <S.Input name="lastName" placeholder="Last Name" ref={register({ required: true })} />
      <S.Input name="email" placeholder="Email" ref={register({ required: true })} />
      <S.Input name="password" placeholder="Password" ref={register({ required: true })} />
      <S.Input name="phone" placeholder="Phone Number" ref={register({ required: true })} />
      <S.Input type="submit" />
    </S.Form>
  );
};
