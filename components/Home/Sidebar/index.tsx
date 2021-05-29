import { Checkbox, FormGroup } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React from "react";
import * as S from "../styled";

export const SideBar = props => {
  const allSelected = obj => {
    for (const key in obj) {
      if (!obj[key]) return false;
    }
    return true;
  };
  const isIndeterminant = obj => {
    let initVal;
    for (const key in obj) {
      if (initVal === undefined) initVal = obj[key];
      if (obj[key] !== initVal) return true;
    }
    return false;
  };

  return (
    <S.SideBarDiv>
      <h2>Categories</h2>
      <FormGroup row={false}>
        {props.categories.map(category => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                name={category}
                checked={props.selectedCategories[category]}
                color="primary"
                onClick={() => props.onCategorySelect(category)}
              />
            }
            label={category}
          />
        ))}
        <FormControlLabel
          key="selectAll"
          control={
            <Checkbox
              name="selectAll"
              checked={allSelected(props.selectedCategories)}
              indeterminate={isIndeterminant(props.selectedCategories)}
              color="primary"
              onClick={() => props.onCategorySelectAll(!allSelected(props.selectedCategories))}
            />
          }
          label={"Select All Categories"}
        />
      </FormGroup>
      <h2>Generations</h2>
      <FormGroup row={false}>
        {props.generations.map(generation => (
          <FormControlLabel
            key={generation}
            control={
              <Checkbox
                name={generation}
                checked={props.selectedGenerations[generation]}
                color="primary"
                onClick={() => props.onGenerationSelect(generation)}
              />
            }
            label={generation}
          />
        ))}
        <FormControlLabel
          key="selectAll"
          control={
            <Checkbox
              name="selectAll"
              checked={allSelected(props.selectedGenerations)}
              indeterminate={isIndeterminant(props.selectedGenerations)}
              color="primary"
              onClick={() => props.onGenerationSelectAll(!allSelected(props.selectedGenerations))}
            />
          }
          label={"Select All Categories"}
        />
      </FormGroup>
    </S.SideBarDiv>
  );
};
