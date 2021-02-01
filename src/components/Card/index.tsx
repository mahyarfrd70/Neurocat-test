import { PropsWithChildren, ReactElement } from "react";
import styled from "styled-components";
import { colors } from "@GlobalStyles/variables";

// we can also pass other props to component for customizing to use in other pages.

const CardContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 20px;
  &:not(:last-child) {
    border-bottom: 1px solid ${colors.gray};
  }
`;

function CardItem({ children }: PropsWithChildren<{}>): ReactElement {
  return <CardContainer data-testid="card">{children}</CardContainer>;
}

export default CardItem;
