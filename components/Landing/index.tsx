import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import * as S from "../styled";
import { usePlacesWidget } from "react-google-autocomplete";
import { useEffect, useState } from "react";
import Geocode from "react-geocode";

type LandingInputs = {
  birthday: number;
  city: string;
};

export const InitializeUser = () => {
  const { register, handleSubmit, setValue } = useForm<LandingInputs>();
  const [, setCookies] = useCookies(["birthday", "city"]);
  const [cityName, setCityName] = useState("");
  const [init, setInit] = useState(false);
  const onSubmit = async (data: LandingInputs) => {
    setCookies("birthday", data.birthday);
    setCookies("city", data.city);
    console.log(data);
  };

  const { ref } = usePlacesWidget({
    apiKey: process.env.PLACES_API_KEY,
    onPlaceSelected: place => console.log(place),
  });

  useEffect(() => {
    register("city", { required: true });
  }, []);

  if (!init && navigator.geolocation) {
    console.log("SDGHFDYFGHJFL");
    navigator.geolocation.getCurrentPosition(async response => {
      const lat = response.coords.latitude;
      const lng = response.coords.longitude;
      Geocode.setApiKey(process.env.PLACES_API_KEY);
      const geocode = await Geocode.fromLatLng(lat, lng);
      let city, state, country;
      for (let i = 0; i < geocode.results[0].address_components.length; i++) {
        for (let j = 0; j < geocode.results[0].address_components[i].types.length; j++) {
          switch (geocode.results[0].address_components[i].types[j]) {
            case "locality":
              city = geocode.results[0].address_components[i].long_name;
              break;
            case "administrative_area_level_1":
              state = geocode.results[0].address_components[i].short_name;
              break;
            case "country":
              country = geocode.results[0].address_components[i].long_name;
              break;
          }
        }
      }
      setValue("city", city + ", " + state + ", " + country);
      setCityName(city + ", " + state + ", " + country);
      setInit(true);
    });
  }

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Input name="birthday" placeholder="Birthday" ref={register({ required: true })} />
      <S.Input
        name="city"
        onChange={e => {
          setValue("city", e.target.value);
          setCityName(e.target.value);
        }}
        value={cityName}
        placeholder="City"
        ref={ref}
      />
      <S.Input type="submit" />
    </S.Form>
  );
};
