import { ApprovalMemory } from "../Memory/ApprovalMemory";

export const ApprovalMemoriesDisplay = ({ memories, onApprovalStatusChange }) => {
  return memories.map(memory => (
    <ApprovalMemory
      onApprovalStatusChange={onApprovalStatusChange}
      key={memory.title}
      memory={memory}
    />
  ));
};
