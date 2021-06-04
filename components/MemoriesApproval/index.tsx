import { useApolloClient } from "@apollo/client";
import { useGetMemories } from "@app/graphql/hooks/memories/useGetMemories";
import { useEffect, useState } from "react";
import { ApprovalMemoriesDisplay } from "../MemoriesApproval/ApprovalMemoriesDisplay";
import { Input } from "../styled";

export const MemoriesApproval = () => {
  const client = useApolloClient();
  const getMemories = useGetMemories(client);
  const [memories, setMemories] = useState([]);
  const [updatedMemories, setUpdatedMemories] = useState([]);

  useEffect(() => {
    const initializeMemories = async () => {
      setMemories((await getMemories()).data.getMemories);
    };
    initializeMemories();
  }, []);

  const handleSubmit = () => {};

  return (
    <>
      <ApprovalMemoriesDisplay
        onApprovalStatusChange={updatedMemory => {
          try {
            const existingMemory = updatedMemories.filter(
              memory => memory.id === updatedMemory.id
            )[0];
            existingMemory.approvalStatus = updatedMemory.approvalStatus;
          } catch {
            setUpdatedMemories([...updatedMemories, updatedMemory]);
          }
        }}
        memories={memories}
      />
      <Input type="submit" onClick={handleSubmit} />
    </>
  );
};
