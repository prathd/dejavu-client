import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import * as S from "../styled";
import { useState } from "react";
import { LocationPicker } from "../UI/LocationInput";

type LandingInputs = {
  birthday: number;
};

export const InitializeUser = () => {
  const { register, handleSubmit } = useForm<LandingInputs>();
  const [, setCookies] = useCookies(["birthday", "city"]);
  const [place, setPlace] = useState(null);
  const [cityName, setCityName] = useState("");
  const onSubmit = async (data: LandingInputs) => {
    setCookies("birthday", data.birthday);
    setCookies("city", place.formattedAddress);
    setCookies("latlng", `${place.lat},${place.lng}`);
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Label>Birthday</S.Label>
      <S.Input
        name="birthday"
        type="date"
        placeholder="Birthday"
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
      <S.Input type="submit" />
    </S.Form>
  );
};
