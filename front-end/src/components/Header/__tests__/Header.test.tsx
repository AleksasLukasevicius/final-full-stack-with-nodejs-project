import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "../Header";
import renderer from "react-test-renderer";

describe("Header", () => {
  it.skip("should render Header naviagations links", () => {
    render(
      <BrowserRouter>
        (<Header />
        );
      </BrowserRouter>
    );

    expect(screen.getByLabelText("home link")).toBeVisible();
    expect(screen.getByLabelText("products link")).toBeVisible();
    expect(screen.getByLabelText("cart link")).toBeVisible();
  });

  it.each(["home link", "products link", "cart link"])(
    "should render Header naviagation %s",
    (link) => {
      render(
        <BrowserRouter>
          (<Header />
          );
        </BrowserRouter>
      );

      expect(screen.getByLabelText(link)).toBeVisible();
    }
  );

  it("matches snapshot", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          (<Header />
          );
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
