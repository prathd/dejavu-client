import { useApolloClient } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useSignup } from "@app/graphql/hooks/useSignup";
import * as S from "../../styled";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import toaster from "@app/lib/toaster";

type SignupInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  subscribe: boolean;
};

export const Signup = () => {
  const client = useApolloClient();
  const signup = useSignup(client);
  const { register, handleSubmit } = useForm<SignupInputs>();
  const onSubmit = data => {
    try {
      signup(data.firstName, data.lastName, data.email, data.password, data.phone, data.subscribe);
    } catch (ex) {
      toaster.error(ex.message);
    }
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Input
        name="firstName"
        autoComplete="given-name"
        placeholder="First Name"
        ref={register({ required: true })}
      />
      <S.Input
        name="lastName"
        autoComplete="family-name"
        placeholder="Last Name"
        ref={register({ required: true })}
      />
      <S.Input
        name="email"
        autoComplete="email"
        placeholder="Email"
        ref={register({ required: true })}
      />
      <S.Input
        name="password"
        autoComplete="off"
        placeholder="Password"
        ref={register({ required: true })}
      />
      <S.Input
        name="phone"
        autoComplete="tel"
        placeholder="Phone Number"
        ref={register({ required: true })}
      />
      <FormControlLabel
        control={<S.Checkbox name="subscribe" color="primary" />}
        label="Subscribe to Newsletter"
        inputRef={register}
      />
      <S.Input type="submit" />
    </S.Form>
  );
};
