import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from ".";

describe("Input tests", () => {
  test("Input", () => {
    const mockChange = jest.fn();
    const value = "test";
    const { getByDisplayValue, getByRole } = render(
      <Input value={value} onChange={mockChange} />
    );
    expect(getByDisplayValue(value)).toBeInTheDocument();
    userEvent.type(getByRole("textbox"), value);
    expect(mockChange).toBeCalledTimes(value.length);
  });
});
