import { Memory } from "../Memory";

export const MemoriesDisplay = props => {
  return props.memories.map(memory => <Memory key={memory.title} memory={memory} />);
};
