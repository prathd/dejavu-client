import { Checkbox, FormGroup } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React from "react";

export const SideBar = ({
  categories,
  selectedCategories,
  onCategorySelect,
  onCategorySelectAll,
  generations,
  selectedGenerations,
  onGenerationSelect,
  onGenerationSelectAll,
}) => {
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
    <>
      <h2>Categories</h2>
      <FormGroup row={false}>
        {categories.map(category => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                name={category}
                checked={selectedCategories[category]}
                color="primary"
                onClick={() => onCategorySelect(category)}
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
              checked={allSelected(selectedCategories)}
              indeterminate={isIndeterminant(selectedCategories)}
              color="primary"
              onClick={() => onCategorySelectAll(!allSelected(selectedCategories))}
            />
          }
          label="Select All Categories"
        />
      </FormGroup>
      <h2>Generations</h2>
      <FormGroup row={false}>
        {generations.map(generation => (
          <FormControlLabel
            key={generation}
            control={
              <Checkbox
                name={generation}
                checked={selectedGenerations[generation]}
                color="primary"
                onClick={() => onGenerationSelect(generation)}
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
              checked={allSelected(selectedGenerations)}
              indeterminate={isIndeterminant(selectedGenerations)}
              color="primary"
              onClick={() => onGenerationSelectAll(!allSelected(selectedGenerations))}
            />
          }
          label="Select All Categories"
        />
      </FormGroup>
    </>
  );
};
