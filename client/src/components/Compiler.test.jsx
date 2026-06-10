import { vi } from "vitest";
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
    // Note: "Code copied!" appears in both the visible status span AND the
    // aria-live region added for screen reader support (Issue #1072).
    expect(screen.getAllByText(/code copied/i).length).toBeGreaterThan(0);
  });

  it("does not break UI after repeated clicks", async () => {
    const user = userEvent.setup();
    render(<Compiler />);

    const btn = screen.getByTitle("Copy Code");

    await user.click(btn);
    await user.click(btn);
    await user.click(btn);

    expect(btn).toBeInTheDocument();
  });
});