import styled from "@components/UI/styled";
import MaterialUICheckbox from "@material-ui/core/Checkbox";
import CreatableSelect from "react-select/creatable";

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

export const ReactSelect = styled(CreatableSelect)`
  margin-bottom: 20px;
`;

export const NavigationBar = styled.ul`
  list-style-type: none;
  height: 42px;
  display: flex;
  padding-top: 3px;
  background-color: #e3e8ef;
  z-index: 12;
`;
