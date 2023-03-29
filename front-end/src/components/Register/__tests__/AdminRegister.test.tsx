import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AdminRegister } from "../AdminRegister";

describe("AdminRegister", () => {
  it("should snapshot", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <AdminRegister />
      </BrowserRouter>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
