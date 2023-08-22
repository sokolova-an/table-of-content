import React from "react";
import { render } from "@testing-library/react";
import { PagesContext } from "@/helpers/PageContext";
import ContentTable from "./ContentTable";
import { useTable } from "@/helpers/useTable/useTable";

const mockPages = {
  "page-1": {
    id: "page-1",
    title: "Page 1",
    isActive: false,
    pages: ["page-2"],
  },
};

jest.mock("../../helpers/useTable/useTable", () => ({
  useTable: jest.fn(),
}));

const mockUseContext = {
  pages: mockPages,
  activePageId: "",
  setActivePageId: jest.fn(),
};
const mockUseTable = useTable as jest.Mock;

describe("ContentTable", () => {
  it("should render a table item with correct styles", () => {
    const pageId = "page-1";
    mockUseTable.mockReturnValue({
      mod: "dark",
      isPageActive: true,
      set: new Set(),
      isParent: true,
    });
    const { getByText, container } = render(
      // @ts-ignore
      <PagesContext.Provider value={mockUseContext}>
        <ContentTable pageId={pageId} />
      </PagesContext.Provider>
    );

    const tableItem = getByText("Page 1");
    const li = container.querySelector("li");

    expect(li).toHaveClass("dark");
    expect(li).toBeInTheDocument();
    expect(tableItem).toBeInTheDocument();
  });
});
