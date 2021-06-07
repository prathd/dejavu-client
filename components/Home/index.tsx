import React, { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useCookies } from "react-cookie";
import redirect from "@app/lib/redirect";
import { SideBar } from "@app/components/Home/Sidebar";
import { MemoriesDisplay } from "@app/components/Home/MemoriesDisplay";
import { useGetCategories } from "@app/graphql/hooks/memories/useGetCategories";
import { useGetGenerations } from "@app/graphql/hooks/memories/useGetGenerations";
import { useGetMemories } from "@app/graphql/hooks/memories/useGetMemories";
import { MainDiv, SideBarDiv } from "@app/components/Home/styled";

export const Home = () => {
  const client = useApolloClient();
  const [cookies] = useCookies(["birthday", "city"]);
  const getGenerations = useGetGenerations(client);
  const getCategories = useGetCategories(client);
  const getMemories = useGetMemories(client);
  const [generations, setGenerations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [memories, setMemories] = useState([]);
  const [filteredMemories, setFilteredMemories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedGenerations, setSelectedGenerations] = useState({});

  useEffect(() => {
    const initializeGenerations = async () => {
      const generationsResponse = await getGenerations();
      const mappedGenerations = generationsResponse.data.getGenerations.map(
        generation => generation.name
      );
      const tempSelectedGenerations = {};
      mappedGenerations.forEach(generation => {
        tempSelectedGenerations[generation] = true;
      });
      setSelectedGenerations(tempSelectedGenerations);
      setGenerations(mappedGenerations);
    };
    const initializeCategories = async () => {
      const categoriesResponse = await getCategories();
      const mappedCategories = categoriesResponse.data.getCategories.map(category => category.name);
      const tempSelectedCategories = {};
      mappedCategories.forEach(category => {
        tempSelectedCategories[category] = true;
      });
      setSelectedCategories(tempSelectedCategories);
      setCategories(mappedCategories);
    };
    const initializeMemories = async () => {
      setMemories((await getMemories()).data.getMemories);
    };
    initializeGenerations();
    initializeCategories();
    initializeMemories();
  }, []);

  useEffect(() => {
    if (!cookies.birthday || !cookies.city) {
      redirect({}, "/");
    }
  }, [cookies]);

  useEffect(() => {
    setFilteredMemories(
      memories.filter(memory => {
        if (memory.approvalStatus !== "Confirmed") return false;
        let generationFilter = false;
        let categoryFilter = false;
        memory.generations.forEach(generation => {
          if (selectedGenerations[generation.name]) generationFilter = true;
        });
        memory.categories.forEach(category => {
          if (selectedCategories[category.name]) categoryFilter = true;
        });
        return generationFilter && categoryFilter;
      })
    );
  }, [selectedGenerations, selectedCategories, memories]);

  return (
    <>
      <SideBarDiv>
        <SideBar
          generations={generations}
          selectedGenerations={selectedGenerations}
          categories={categories}
          selectedCategories={selectedCategories}
          onCategorySelect={category =>
            setSelectedCategories({
              ...selectedCategories,
              [category]: !selectedCategories[category],
            })
          }
          onCategorySelectAll={val => {
            const tempSelectedCategories = { ...selectedCategories };
            for (const key in tempSelectedCategories) {
              tempSelectedCategories[key] = val;
            }
            setSelectedCategories(tempSelectedCategories);
          }}
          onGenerationSelect={generation => {
            setSelectedGenerations({
              ...selectedGenerations,
              [generation]: !selectedGenerations[generation],
            });
          }}
          onGenerationSelectAll={val => {
            const tempSelectedGenerations = { ...selectedGenerations };
            for (const key in tempSelectedGenerations) {
              tempSelectedGenerations[key] = val;
            }
            setSelectedGenerations(tempSelectedGenerations);
          }}
        />
      </SideBarDiv>
      <MainDiv>
        <MemoriesDisplay memories={filteredMemories} />
      </MainDiv>
    </>
  );
};
