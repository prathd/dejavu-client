import { useEffect, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import Geocode from "react-geocode";
import * as S from "../styled";

export const LocationPicker = props => {
  const [init, setInit] = useState(false);
  const [cityName, setCityName] = useState(props.cityName);

  const { ref } = usePlacesWidget({
    apiKey: process.env.PLACES_API_KEY,
    onPlaceSelected: place => console.log(place),
  });

  useEffect(() => {
    setCityName(props.cityName);
  }, [props.cityName]);

  if (!init && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async response => {
      const lat = response.coords.latitude;
      const lng = response.coords.longitude;
      Geocode.setApiKey(process.env.PLACES_API_KEY);
      const geocode = await Geocode.fromLatLng(lat, lng);
      setInit(true);
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
      setCityName(city + ", " + state + ", " + country);
      props.onChange({ target: { value: city + ", " + state + ", " + country } });
    });
  }
  return (
    <S.Input
      name={props.name}
      type="text"
      autoComplete="off"
      onChange={props.onChange}
      value={cityName}
      placeholder={props.placeholder}
      ref={ref}
    />
  );
};
