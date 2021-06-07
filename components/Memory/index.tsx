import React from "react";
import * as S from "../Home/styled";

export const Memory = ({ memory }) => {
  return (
    <S.MemoryDiv>
      <S.MemoryHeader>{memory.title}</S.MemoryHeader>
      <S.MemoryBody>
        <li key="description">Description: {memory.description}</li>
        <li key="imageUrl">Image: {memory.imageUrl}</li>
        <li key="videoUrl">Video: {memory.videoUrl}</li>
        <li key="year">Year: {memory.year}</li>
        <li key="location">Location: {memory.location.formattedAddress}</li>
        <li key="generation">
          Generation: {memory.generations.map(generation => generation.name).join(", ")}
        </li>
        <li key="category">
          Category: {memory.categories.map(category => category.name).join(", ")}
        </li>
      </S.MemoryBody>
    </S.MemoryDiv>
  );
};
