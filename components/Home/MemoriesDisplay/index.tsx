import * as S from "../styled";
import { Memory } from "./Memory";

export const MemoriesDisplay = props => {
  console.log(props);

  return (
    <S.MainDiv>
      {props.memories.map(memory => (
        <Memory key={memory.title} memory={memory} />
      ))}
    </S.MainDiv>
  );
};
