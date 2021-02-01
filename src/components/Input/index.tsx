import { ChangeEvent, ReactElement } from "react";
import styled from "styled-components";
import { fontSizes } from "@GlobalStyles/variables";

// we can also pass other props to component for customizing to use in other pages.
// for example we can pass styles and className to it to customize style of input.
// we can also pass error and validation to check if it is valid or not.

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  font-size: ${fontSizes["fs-16"]};
  outline: unset;
`;

function CInput({ value, onChange }: Props): ReactElement {
  return <Input value={value} onChange={onChange} />;
}

export default CInput;
