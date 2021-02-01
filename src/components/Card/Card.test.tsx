import { render } from "@testing-library/react";
import Card from ".";

test("Card test", () => {
  const title = "Apple";
  const { getByText } = render(<Card>{title}</Card>);
  expect(getByText(title)).toBeInTheDocument();
});
