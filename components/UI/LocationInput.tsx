import { useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import Geocode from "react-geocode";
import * as S from "../styled";
import { useCookies } from "react-cookie";

export interface Location {
  formattedAddress: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
  country: string;
  placeId: string;
}

export const LocationPicker = props => {
  const [cookies] = useCookies(["latlng"]);
  const [init, setInit] = useState(false);

  const getAddressComponents = (result): Location => {
    let placeId = result.place_id,
      formattedAddress = result.formatted_address,
      lat =
        typeof result.geometry.location.lat === "function"
          ? result.geometry.location.lat()
          : result.geometry.location.lat,
      lng =
        typeof result.geometry.location.lng === "function"
          ? result.geometry.location.lng()
          : result.geometry.location.lng,
      city,
      state,
      country;
    result.address_components.forEach(component => {
      if (component.types.includes("locality")) city = component.long_name;
      else if (component.types.includes("administrative_area_level_1"))
        state = component.short_name;
      else if (component.types.includes("country")) country = component.long_name;
    });
    return { placeId, formattedAddress, lat, lng, city, state, country };
  };

  const { ref } = usePlacesWidget({
    apiKey: process.env.PLACES_API_KEY,
    onPlaceSelected: place => {
      const location = getAddressComponents(place);
      props.onPlaceSelected(location);
    },
  });

  if (!init && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async response => {
      const lat = cookies.latlng ? cookies.latlng.split(",")[0] : response.coords.latitude;
      const lng = cookies.latlng ? cookies.latlng.split(",")[1] : response.coords.longitude;
      Geocode.setApiKey(process.env.PLACES_API_KEY);
      const geocode = await Geocode.fromLatLng(lat, lng);
      setInit(true);
      geocode.results.forEach(result => {
        if (result.types.includes("locality") && result.types.includes("political")) {
          console.log(result);
          const location = getAddressComponents(result);
          props.onPlaceSelected(location);
        }
      });
    });
  }
  return (
    <S.Input
      name={props.name}
      type="text"
      autoComplete="off"
      onChange={e => {
        props.onChange(e);
      }}
      value={props.cityName}
      ref={ref}
    />
  );
};
