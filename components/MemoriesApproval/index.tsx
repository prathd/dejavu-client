import { useApolloClient } from "@apollo/client";
import { useGetMemories } from "@app/graphql/hooks/memories/useGetMemories";
import { useUpdateMemory } from "@app/graphql/hooks/memories/useUpdateMemory";
import { useEffect, useState } from "react";
import { ApprovalMemoriesDisplay } from "../MemoriesApproval/ApprovalMemoriesDisplay";
import { Input } from "../styled";

export const MemoriesApproval = () => {
  const client = useApolloClient();
  const getMemories = useGetMemories(client);
  const updateMemory = useUpdateMemory();
  const [memories, setMemories] = useState([]);
  const [updatedMemories, setUpdatedMemories] = useState([]);

  useEffect(() => {
    const initializeMemories = async () => {
      setMemories(
        (await getMemories()).data.getMemories.filter(memory => memory.approvalStatus === "Pending")
      );
    };
    initializeMemories();
  }, []);

  const handleSubmit = () => {
    updatedMemories.forEach(memory => {
      const { id, title, description, year, imageUrl, videoUrl, approvalStatus } = memory;
      const { lat, lng, placeId, formattedAddress } = memory.location;
      const userId = memory.user.id;
      updateMemory(
        id,
        title,
        description,
        year,
        memory.generations.map(generation => generation.id).join(","),
        memory.categories.map(category => category.id).join(","),
        lat,
        lng,
        placeId,
        formattedAddress,
        imageUrl,
        videoUrl,
        userId,
        approvalStatus
      );
    });
  };

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
