import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Events } from "../Events";

describe("Events", () => {
  it("should snapshot", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <Events />
      </BrowserRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render Events", () => {
    render(
      <BrowserRouter>
        <Events />
      </BrowserRouter>
    );

    expect(screen.getByText("Events")).toBeInTheDocument();
  });
});
