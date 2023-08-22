import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Search from "./Search";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Search", () => {
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    mockUseRouter.mockClear();
  });

  it("should update search state on input change", () => {
    render(<Search refetch={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText(
      "Search..."
    ) as HTMLInputElement;
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "new-search" } });

    expect(searchInput.value).toBe("new-search");
  });

  it("should navigate to search route and trigger refetch", () => {
    const mockRouterPush = jest.fn();
    mockUseRouter.mockReturnValue({
      push: mockRouterPush,
    });

    const mockRefetch = jest.fn();

    render(<Search refetch={mockRefetch} />);
    const searchInput = screen.getByPlaceholderText("Search...");
    const searchButton = screen.getByRole("button");

    fireEvent.change(searchInput, { target: { value: "new-search" } });
    fireEvent.click(searchButton);

    expect(mockRouterPush).toHaveBeenCalledWith("?search=new-search");
    expect(mockRefetch).toHaveBeenCalledTimes(1);
  });

  it("should navigate to root route if search input is empty", () => {
    const mockRouterPush = jest.fn();
    mockUseRouter.mockReturnValue({
      push: mockRouterPush,
    });

    render(<Search refetch={jest.fn()} />);
    const searchInput = screen.getByPlaceholderText("Search...");
    const searchButton = screen.getByRole("button");

    fireEvent.change(searchInput, { target: { value: "" } });
    fireEvent.click(searchButton);

    expect(mockRouterPush).toHaveBeenCalledWith("/");
  });
});
