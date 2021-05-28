import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import * as S from "../styled";
import { useState } from "react";
import { LocationPicker } from "../UI/LocationInput";
import toaster from "@app/lib/toaster";

type LandingInputs = {
  birthday: number;
  city: string;
};

export const InitializeUser = () => {
  const { register, handleSubmit, setValue } = useForm<LandingInputs>();
  const [, setCookies] = useCookies(["birthday", "city"]);
  const [placeSelected, setPlaceSelected] = useState(false);
  const [place, setPlace] = useState(null);
  const [cityName, setCityName] = useState("");
  const onSubmit = async (data: LandingInputs) => {
    if (!placeSelected) {
      toaster.error("Please choose a city from autocomplete");
      return;
    }
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
          setPlaceSelected(false);
          setCityName(e.target.value);
        }}
        onPlaceSelected={place => {
          setPlace(place);
          setValue("city", place.formattedAddress);
          setCityName(place.formattedAddress);
          setPlaceSelected(true);
        }}
        cityName={cityName}
      />
      <S.Input type="submit" />
    </S.Form>
  );
};
