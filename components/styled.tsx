import styled from "@components/UI/styled";
import MaterialUICheckbox from "@material-ui/core/Checkbox";
import Select from "react-select";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
`;

export const Input = styled.input`
  margin-bottom: 20px;
`;

export const Label = styled.label``;

export const Checkbox = styled(MaterialUICheckbox)``;

export const ReactSelect = styled(Select)`
  margin-bottom: 20px;
`;
