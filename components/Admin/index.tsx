import { useApolloClient } from "@apollo/client";
import { useCreateCategory } from "@app/graphql/hooks/useCreateCategory";
import { useCreateGeneration } from "@app/graphql/hooks/useCreateGeneration";
import { useCreateMemory } from "@app/graphql/hooks/useCreateMemory";
import { useGetCategories } from "@app/graphql/hooks/useGetCategories";
import { useGetGenerations } from "@app/graphql/hooks/useGetGenerations";
import toaster from "@app/lib/toaster";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as S from "../styled";

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

export const AddGeneration = () => {
  const { handleSubmit, register, reset } = useForm<AddGenerationInput>();
  const createGeneration = useCreateGeneration();

  const onSubmit = (data: AddGenerationInput) => {
    try {
      createGeneration(data.name, data.startYear, data.endYear);
      reset();
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

export const AddCategory = () => {
  const { handleSubmit, register, reset } = useForm<AddCategoryInput>();
  const createCategory = useCreateCategory();

  const onSubmit = (data: AddCategoryInput) => {
    try {
      createCategory(data.name);
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

export const AddMemory = () => {
  const client = useApolloClient();
  const { handleSubmit, register, reset, control } = useForm<AddMemoryInput>();
  const createMemory = useCreateMemory();
  const getGenerations = useGetGenerations(client);
  const getCategories = useGetCategories(client);
  const [generations, setGenerations] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      const generationsResponse = await getGenerations();
      setGenerations(
        generationsResponse.data.getGenerations.map(generation => ({
          value: generation.id,
          label: generation.name,
        }))
      );
      const categoriesResponse = await getCategories();
      setCategories(
        categoriesResponse.data.getCategories.map(category => ({
          value: category.id,
          label: category.name,
        }))
      );
    };
    initialize();
  });

  const onSubmit = (data: AddMemoryInput) => {
    try {
      createMemory(
        data.title,
        data.description,
        data.year,
        data.generations.map(generation => generation.value).join(","),
        data.categories.map(category => category.value).join(","),
        data.location,
        data.imageUrl,
        data.videoUrl
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
      <S.Input name="location" placeholder="Memory Location" ref={register({ required: true })} />
      <S.Input name="imageUrl" placeholder="Image Link" ref={register({ required: true })} />
      <S.Input name="videoUrl" placeholder="Video Link" ref={register({ required: true })} />
      <S.Input type="submit" />
    </S.Form>
  );
};
