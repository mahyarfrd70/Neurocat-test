import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from ".";

describe("Button tests", () => {
  test("Button click", () => {
    const mockClick = jest.fn();
    const title = "Submit";
    const { getByRole, getByText } = render(
      <Button onClick={mockClick}>{title}</Button>
    );
    userEvent.click(getByRole("button"));
    expect(getByText(title)).toBeInTheDocument();
    expect(mockClick).toBeCalledTimes(1);
  });
});
