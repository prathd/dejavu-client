import { useApolloClient } from "@apollo/client";
import { useCreateCategory } from "@app/graphql/hooks/memories/useCreateCategory";
import { useCreateGeneration } from "@app/graphql/hooks/memories/useCreateGeneration";
import { useCreateMemory } from "@app/graphql/hooks/memories/useCreateMemory";
import { useGetCategories } from "@app/graphql/hooks/memories/useGetCategories";
import { useGetGenerations } from "@app/graphql/hooks/memories/useGetGenerations";
import toaster from "@app/lib/toaster";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as S from "../styled";
import { LocationPicker } from "../UI/LocationInput";

interface AddGenerationInput {
  name: string;
  startYear: number;
  endYear: number;
}

interface AddCategoryInput {
  name: string;
}

interface AddMemoryInput {
  title: string;
  description: string;
  year: number;
  generations: any[];
  categories: any[];
  location: string;
  imageUrl: string;
  videoUrl: string;
}

const AddGeneration = ({ onAddGeneration }) => {
  const { handleSubmit, register, reset } = useForm<AddGenerationInput>();
  const createGeneration = useCreateGeneration();

  const onSubmit = async (data: AddGenerationInput) => {
    try {
      const generation = await createGeneration(data.name, data.startYear, data.endYear);
      reset();
      onAddGeneration(generation.data.createGeneration);
    } catch (ex) {
      toaster.error(ex.message);
    }
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Input name="name" placeholder="Generation Name" ref={register({ required: true })} />
      <S.Input
        name="startYear"
        type="number"
        placeholder="Generation Start Year"
        ref={register({ required: true })}
      />
      <S.Input
        name="endYear"
        type="number"
        placeholder="Generation End Year"
        ref={register({ required: true })}
      />
      <S.Input type="submit" />
    </S.Form>
  );
};

export const AddCategory = ({ onAddCategory }) => {
  const { handleSubmit, register, reset } = useForm<AddCategoryInput>();
  const createCategory = useCreateCategory();

  const onSubmit = async (data: AddCategoryInput) => {
    try {
      const category = await createCategory(data.name);
      onAddCategory(category.data.createCategory);
      reset();
    } catch (ex) {
      toaster.error(ex.message);
    }
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Input name="name" placeholder="Category Name" ref={register({ required: true })} />
      <S.Input type="submit" />
    </S.Form>
  );
};

const AddMemory = ({ user, generations, categories }) => {
  const { handleSubmit, register, reset, setValue, control } = useForm<AddMemoryInput>();
  const createMemory = useCreateMemory();
  const [, setPlaceSelected] = useState(false);
  const [place, setPlace] = useState(null);
  const [cityName, setCityName] = useState("");

  const onSubmit = async (data: AddMemoryInput) => {
    try {
      createMemory(
        data.title,
        data.description,
        data.year,
        data.generations.map(generation => generation.value).join(","),
        data.categories.map(category => category.value).join(","),
        place.lat,
        place.lng,
        place.placeId,
        place.formattedAddress,
        data.imageUrl,
        data.videoUrl,
        user.id,
        "Approved"
      );
      reset();
    } catch (ex) {
      toaster.error(ex.message);
    }
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Input name="title" placeholder="Memory Title" ref={register({ required: true })} />
      <S.Input
        name="description"
        placeholder="Memory Description"
        ref={register({ required: true })}
      />
      <S.Input name="year" type="number" placeholder="Year" ref={register({ required: true })} />
      <Controller
        name="generations"
        control={control}
        defaultValue=""
        render={({ onChange }) => (
          <S.ReactSelect
            onChange={e => onChange(e)}
            placeholder="Generations"
            isMulti
            options={generations}
          />
        )}
      />
      <Controller
        name="categories"
        control={control}
        defaultValue=""
        render={({ onChange }) => (
          <S.ReactSelect
            onChange={e => onChange(e)}
            placeholder="Categories"
            isMulti
            options={categories}
          />
        )}
      />
      <LocationPicker
        name="location"
        onChange={e => {
          setPlaceSelected(false);
          setCityName(e.target.value);
        }}
        onPlaceSelected={place => {
          setPlace(place);
          setValue("city", place.formattedAddress);
          setCityName(place.formattedAddress);
          setPlaceSelected(true);
        }}
        cityName={cityName}
      />
      <S.Input name="imageUrl" placeholder="Image Link" ref={register({ required: true })} />
      <S.Input name="videoUrl" placeholder="Video Link" ref={register({ required: true })} />
      <S.Input type="submit" />
    </S.Form>
  );
};

export const Admin = ({ user }) => {
  const client = useApolloClient();
  const getGenerations = useGetGenerations(client);
  const getCategories = useGetCategories(client);
  const [generations, setGenerations] = useState([]);
  const [categories, setCategories] = useState([]);

  const updateGenerations = async () => {
    const generationsResponse = await getGenerations();
    setGenerations(
      generationsResponse.data.getGenerations.map(generation => ({
        value: generation.id,
        label: generation.name,
      }))
    );
  };

  const updateCategories = async () => {
    const categoriesResponse = await getCategories();
    setCategories(
      categoriesResponse.data.getCategories.map(category => ({
        value: category.id,
        label: category.name,
      }))
    );
  };

  useEffect(() => {
    updateGenerations();
    updateCategories();
  }, []);

  return (
    <>
      <AddGeneration
        onAddGeneration={generation =>
          setGenerations([...generations, { value: generation.id, label: generation.name }])
        }
      />
      <AddCategory
        onAddCategory={category =>
          setCategories([...categories, { value: category.id, label: category.name }])
        }
      />
      <AddMemory generations={generations} categories={categories} user={user} />
    </>
  );
};
