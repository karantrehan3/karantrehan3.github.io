import { render, screen } from "@test/utils";

import { Welcome } from "./Welcome";

describe("Welcome component", () => {
  it("renders the welcome message with name", () => {
    render(<Welcome />);
    expect(screen.getByText("Karan Trehan")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<Welcome />);
    expect(
      screen.getByText("Senior Software Engineer & AI Enthusiast")
    ).toBeInTheDocument();
  });
});
