import { useApolloClient } from "@apollo/client";
import { useGetMemories } from "@app/graphql/hooks/memories/useGetMemories";
import React, { useEffect, useState } from "react";
import { MemoriesDisplay } from "../Home/MemoriesDisplay";
import { ChangePassword } from "./ChangePassword";
import { UpdateUser } from "./UpdateUser";

export const Settings = props => {
  const { user } = props;
  const client = useApolloClient();
  const getMemories = useGetMemories(client);
  const [confirmedMemories, setConfirmedMemories] = useState([]);
  const [pendingMemories, setPendingMemories] = useState([]);
  const [deniedMemories, setDeniedMemories] = useState([]);

  useEffect(() => {
    const init = async () => {
      const memoriesResponse = await getMemories();
      setConfirmedMemories(
        memoriesResponse.data.getMemories.filter(
          memories => memories.approvalStatus === "Confirmed"
        )
      );
      setPendingMemories(
        memoriesResponse.data.getMemories.filter(memories => memories.approvalStatus === "Pending")
      );
      setDeniedMemories(
        memoriesResponse.data.getMemories.filter(memories => memories.approvalStatus === "Denied")
      );
    };
    init();
  }, []);

  return (
    <>
      <UpdateUser readOnly={false} user={user} />
      <ChangePassword user={user} />
      <h2>Approved memories</h2>
      <MemoriesDisplay memories={confirmedMemories} />
      <h2>Pending memories</h2>
      <MemoriesDisplay memories={pendingMemories} />
      <h2>Denied memories</h2>
      <MemoriesDisplay memories={deniedMemories} />
    </>
  );
};

// memoriesResponse.data.getMemories.map(memory => {
//   return {
//     id: memory.id,
//     title: memory.title,
//     description: memory.description,
//     year: memory.year,
//     location: memory.location.formattedAddress,
//     generations: memory.generations.map(generation => generation.name).join(", "),
//     categories: memory.categories.map(category => category.name).join(", "),
//     image: memory.imageUrl,
//     video: memory.videoUrl,
//     user: memory.user.firstName + " " + memory.user.lastName,
//     approvalStatus: memory.approvalStatus,
//   };
// })
