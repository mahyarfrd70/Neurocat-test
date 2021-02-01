import { PropsWithChildren, ReactElement } from "react";
import styled from "styled-components";
import { fontSizes } from "@GlobalStyles/variables";

// we can also pass other props to component for customizing to use in other pages.
// for example we can pass styles and className to it to customize style of button.

interface Props {
  onClick: () => void;
}

const Button = styled.button`
  height: 60px;
  border: none;
  width: 60px;
  font-size: ${fontSizes["fs-32"]};
  background-color: transparent;
`;

function CButton({
  onClick,
  children,
}: PropsWithChildren<Props>): ReactElement {
  return <Button onClick={onClick}>{children}</Button>;
}

export default CButton;
