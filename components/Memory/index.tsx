import React from "react";
import * as S from "../Home/styled";

export const Memory = props => {
  return (
    <S.MemoryDiv>
      <S.MemoryHeader>{props.memory.title}</S.MemoryHeader>
      <S.MemoryBody>
        <li key="description">Description: {props.memory.description}</li>
        <li key="imageUrl">Image: {props.memory.imageUrl}</li>
        <li key="videoUrl">Video: {props.memory.videoUrl}</li>
        <li key="year">Year: {props.memory.year}</li>
        <li key="location">Location: {props.memory.location.formattedAddress}</li>
        <li key="generation">
          Generation: {props.memory.generations.map(generation => generation.name).join(", ")}
        </li>
        <li key="category">
          Category: {props.memory.categories.map(category => category.name).join(", ")}
        </li>
      </S.MemoryBody>
    </S.MemoryDiv>
  );
};
