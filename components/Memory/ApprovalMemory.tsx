import React from "react";
import * as S from "../Home/styled";
import { ReactSelect } from "@components/styled";

export const ApprovalMemory = ({ memory, onApprovalStatusChange }) => {
  console.log(memory.approvalStatus);
  const options = [
    { value: "Confirmed", label: "Confirmed" },
    { value: "Pending", label: "Pending" },
    { value: "Denied", label: "Denied" },
  ];
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
        <li key="Approval">
          <ReactSelect
            placeholder="Approval Status"
            options={options}
            onChange={e => {
              console.log(e);
              onApprovalStatusChange({ ...memory, approvalStatus: e.value });
            }}
            defaultValue={options.filter(option => option.label === memory.approvalStatus)}
          />
        </li>
      </S.MemoryBody>
    </S.MemoryDiv>
  );
};
