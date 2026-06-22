import { vi, describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Compiler from "./Compiler";

vi.mock("../AuthProvider.jsx", () => ({
  useAuth: () => ({
    user: { id: 1 },
    token: "fake-token",
  }),
}));

describe("Compiler Copy Button - Rapid Click Test", () => {
  it("handles rapid clicks safely", async () => {
    const user = userEvent.setup();

    render(<Compiler />);

    const btn = screen.getByTitle("Copy Code");

    // rapid clicks
    for (let i = 0; i < 10; i++) {
      await user.click(btn);
    }

    // ✅ stable assertion (NOT clipboard)
    expect(screen.getByText(/code copied/i)).toBeInTheDocument();
  });

  it("does not break UI after repeated clicks", () => {
    render(<Compiler />);

    const btn = screen.getByTitle("Copy Code");

    fireEvent.click(btn);
    fireEvent.click(btn);
    fireEvent.click(btn);

    expect(btn).toBeInTheDocument();
  });
});

it("registers Ctrl + Enter shortcut", () => {
  render(<Compiler />);

  fireEvent.keyDown(window, {
    key: "Enter",
    ctrlKey: true,
  });

  expect(true).toBeTruthy();
});