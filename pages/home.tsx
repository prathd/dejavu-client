import React, { useEffect, useState } from "react";
import { withProfiler } from "@sentry/react";
import { useApolloClient } from "@apollo/client";
import NavigationHOC from "@app/layouts/NavigationHOC";
import checkLoggedIn from "@app/lib/checkLoggedIn";
import { initializeApollo } from "@lib/apollo";
import Button from "@app/components/UI/Button";
import { useLogout } from "@app/graphql/hooks/useLogout";
import Link from "next/link";
import { useCookies } from "react-cookie";
import redirect from "@app/lib/redirect";
import { SideBar } from "@app/components/Home/Sidebar";
import { MemoriesDisplay } from "@app/components/Home/MemoriesDisplay";
import { NavigationBar } from "@app/components/Navigation";
import { useGetCategories } from "@app/graphql/hooks/useGetCategories";
import { useGetGenerations } from "@app/graphql/hooks/useGetGenerations";
import { useGetMemories } from "@app/graphql/hooks/useGetMemories";

const Home = ({ loggedInUser }) => {
  const client = useApolloClient();
  const logout = useLogout(client);
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
      let tempSelectedGenerations = {};
      mappedGenerations.forEach(generation => {
        tempSelectedGenerations[generation] = true;
      });
      setSelectedGenerations(tempSelectedGenerations);
      setGenerations(mappedGenerations);
    };
    const initializeCategories = async () => {
      const categoriesResponse = await getCategories();
      const mappedCategories = categoriesResponse.data.getCategories.map(category => category.name);
      let tempSelectedCategories = {};
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
    initializeMemories();
    initializeCategories();
  }, []);

  useEffect(() => {
    if (!cookies.birthday || !cookies.city) {
      redirect({}, "/");
    }
  }, [cookies]);

  useEffect(() => {
    setFilteredMemories(
      memories.filter(memory => {
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
  }, [selectedGenerations, selectedCategories]);

  return (
    <NavigationHOC>
      <NavigationBar>
        {loggedInUser.me !== undefined ? (
          <Button name="logout" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Link name="login" href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </NavigationBar>
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
      <MemoriesDisplay memories={filteredMemories} />
    </NavigationHOC>
  );
};

Home.getInitialProps = async context => {
  const apolloClient = initializeApollo(context);
  const { loggedInUser } = await checkLoggedIn(apolloClient);

  return { loggedInUser };
};

export default withProfiler(Home);
