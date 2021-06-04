import { useApolloClient } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useSignup } from "@app/graphql/hooks/user/useSignup";
import * as S from "../../styled";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { LocationPicker } from "../../UI/LocationInput";
import { useCookies } from "react-cookie";
import { useState } from "react";

type SignupInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  subscribe: boolean;
};

export const Signup = () => {
  const client = useApolloClient();
  const signup = useSignup(client);
  const { register, handleSubmit } = useForm<SignupInputs>();
  const [place, setPlace] = useState(null);
  const [cityName, setCityName] = useState("");
  const [cookies, setCookies] = useCookies(["city", "birthday", "latlng"]);
  const onSubmit = async (data: SignupInputs) => {
    setCookies("birthday", data.birthday);
    setCookies("city", place.formattedAddress);
    setCookies("latlng", `${place.lat},${place.lng}`);
    signup(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.phone,
      new Date(data.birthday),
      place,
      data.subscribe
    );
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
        type="password"
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
      <S.Label>Birthday</S.Label>
      <S.Input
        name="birthday"
        type="date"
        placeholder="Birthday"
        defaultValue={cookies.birthday}
        ref={register({ required: true })}
      />
      <LocationPicker
        name="city"
        onChange={e => {
          setCityName(e.target.value);
        }}
        onPlaceSelected={place => {
          setPlace(place);
          setCityName(place.formattedAddress);
        }}
        value={cityName}
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
