import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App, { defaultItems } from "./App";

describe("App tests", () => {
  test("Change search input", () => {
    const { getByRole } = render(<App />);
    const value = "test";
    userEvent.type(getByRole("textbox"), value);
    expect(getByRole("textbox")).toHaveValue(value);
  });

  test("Add new item", () => {
    const refSpy = jest.spyOn(React, "useRef");
    const { getByRole, getAllByTestId, getByText } = render(<App />);
    expect(getAllByTestId("card")).toHaveLength(defaultItems.length);
    expect(refSpy).toBeCalledTimes(1);
    userEvent.click(getByRole("button"));
    expect(refSpy).toBeCalledTimes(2);
    expect(getAllByTestId("card")).toHaveLength(defaultItems.length + 1);
    expect(getByText("Random 1")).toBeInTheDocument();
  });

  test("Search items", () => {
    const { getByRole, getAllByTestId } = render(<App />);
    const value = "an";
    userEvent.type(getByRole("textbox"), value);
    const filteredData = defaultItems.filter(
      (item) => item.title.indexOf(value) > -1
    );
    expect(getAllByTestId("card")).toHaveLength(filteredData.length);
  });
});
