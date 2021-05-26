import { useCreateGeneration } from "@app/graphql/hooks/useCreateGeneration";
import { useCreateMemory } from "@app/graphql/hooks/useCreateMemory";
import toaster from "@app/lib/toaster";
import { useForm } from "react-hook-form";
import * as S from "../styled";

interface AddGenerationInput {
  name: string;
  startYear: number;
  endYear: number;
}

interface AddMemoryInput {
  title: string;
  description: string;
  year: number;
  generationNames: string;
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

export const AddMemory = () => {
  const { handleSubmit, register, reset } = useForm<AddMemoryInput>();
  const createMemory = useCreateMemory();

  const onSubmit = (data: AddMemoryInput) => {
    try {
      createMemory(
        data.title,
        data.description,
        data.year,
        data.generationNames,
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
      <S.Input
        name="generationNames"
        placeholder="Generations (Comma separated)"
        ref={register({ required: true })}
      />
      <S.Input name="location" placeholder="Memory Location" ref={register({ required: true })} />
      <S.Input name="imageUrl" placeholder="Image Link" ref={register({ required: true })} />
      <S.Input name="videoUrl" placeholder="Video Link" ref={register({ required: true })} />
      <S.Input type="submit" />
    </S.Form>
  );
};
