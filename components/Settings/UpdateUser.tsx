import { useApolloClient } from "@apollo/client";
import { useUpdateUser } from "@app/graphql/hooks/user/useUpdateUser";
import { FormControlLabel } from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as S from "../styled";
import { LocationPicker } from "../UI/LocationInput";

type UpdateUserInputs = {
  firstName: string;
  lastName: string;
  phone: string;
  subscribe: boolean;
};

export const UpdateUser = props => {
  const { user } = props;
  const client = useApolloClient();
  const { register, handleSubmit } = useForm<UpdateUserInputs>();
  const [place, setPlace] = useState(user.location);
  const [cityName, setCityName] = useState(user.location.formattedAddress);
  const updateUser = useUpdateUser(client);
  const onSubmit = async (data: UpdateUserInputs) => {
    await updateUser(user.id, data.firstName, data.lastName, data.phone, place, data.subscribe);
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Input
        name="firstName"
        readOnly={props.readOnly}
        autoComplete="given-name"
        placeholder="First Name"
        defaultValue={user.firstName}
        ref={register({ required: true })}
      />
      <S.Input
        name="lastName"
        readOnly={props.readOnly}
        autoComplete="family-name"
        placeholder="Last Name"
        defaultValue={user.lastName}
        ref={register({ required: true })}
      />
      {props.showAllFields ? (
        <S.Input
          name="email"
          readOnly={props.readOnly}
          autoComplete="email"
          placeholder="Email"
          defaultValue={user.email}
          ref={register({ required: true })}
        />
      ) : null}
      <S.Input
        name="phone"
        readOnly={props.readOnly}
        autoComplete="tel"
        placeholder="Phone Number"
        defaultValue={user.phone}
        ref={register({ required: true })}
      />
      {props.showAllFields ? (
        <S.Input
          name="birthday"
          readOnly={props.readOnly}
          type="date"
          placeholder="Birthday"
          defaultValue={user.birthday.slice(0, 10)}
          ref={register({ required: true })}
        />
      ) : null}
      {props.readOnly ? (
        <S.Input name="city" readOnly={true} value={cityName} />
      ) : (
        <LocationPicker
          name="city"
          onChange={e => {
            setCityName(e.target.value);
          }}
          onPlaceSelected={place => {
            setPlace(place);
            setCityName(place.formattedAddress);
          }}
          initFromCookie={false}
          value={cityName}
        />
      )}
      <FormControlLabel
        control={
          <S.Checkbox
            name="subscribe"
            readOnly={props.readOnly}
            checked={user.subscribe}
            color="primary"
          />
        }
        label="Subscribe to Newsletter"
        inputRef={register}
      />
      {props.readOnly ? null : <S.Input type="submit" />}
    </S.Form>
  );
};
