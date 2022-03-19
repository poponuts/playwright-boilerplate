import React from "react";
import { render, screen } from "@testing-library/react";
import { SpinnerUnless } from "./Unless";

describe("SpinnerUnless", () => {
  it("renders element when condition is true", () => {
    render(
      <SpinnerUnless condition={true}>
        <p data-testid="target"></p>
      </SpinnerUnless>
    );
    const target = screen.queryByTestId("target");
    expect(target).toBeInTheDocument();
  });
  it("does not render element when condition is false", () => {
    render(
      <SpinnerUnless condition={false}>
        <p data-testid="target"></p>
      </SpinnerUnless>
    );
    const target = screen.queryByTestId("target");
    expect(target).not.toBeInTheDocument();
  });
});
