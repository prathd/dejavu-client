import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import * as S from "../styled";
import { useState } from "react";
import { LocationPicker } from "../UI/LocationInput";

type LandingInputs = {
  birthday: number;
  city: string;
};

export const InitializeUser = () => {
  const { register, handleSubmit, setValue } = useForm<LandingInputs>();
  const [, setCookies] = useCookies(["birthday", "city"]);
  const [cityName, setCityName] = useState("");
  const onSubmit = async (data: LandingInputs) => {
    setCookies("birthday", data.birthday);
    setCookies("city", data.city);
    console.log(data);
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Input name="birthday" placeholder="Birthday" ref={register({ required: true })} />
      <LocationPicker
        name="city"
        onChange={e => {
          setValue("city", e.target.value);
          setCityName(e.target.value);
        }}
        cityName={cityName}
      />
      <S.Input type="submit" />
    </S.Form>
  );
};
