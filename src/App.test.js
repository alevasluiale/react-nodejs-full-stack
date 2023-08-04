import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("axios", () => jest.fn());

test("renders buttons", async () => {
  const { findByText } = render(<App />);

  expect(screen.getByText("Button 1")).toBeInTheDocument();
  expect(screen.getByText("Button 2")).toBeInTheDocument();
  expect(screen.getByText("Button 3")).toBeInTheDocument();
});
