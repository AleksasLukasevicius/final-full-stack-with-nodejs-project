import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";
import renderer from "react-test-renderer";

describe("Footer", () => {
  it("should match Footer snapshot", () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should match Footer snapshot test", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it("should render Footer correctly", () => {
    render(<Footer />);
    const footer = document.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });

  it("should render current year", () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);
    const footer = document.querySelector("footer");
    expect(footer).toHaveTextContent(`${currentYear}`);
  });

  it("should render current year by LabelText", () => {
    render(<Footer />);
    const currentYearElement = screen.getByLabelText("current year");

    expect(currentYearElement).toBeVisible();
    expect(currentYearElement).toHaveTextContent(
      new Date().getFullYear().toString()
    );
  });
});
