import { renderHook } from "@testing-library/react";
import { useTable } from "./useTable";

const activePageId = "active-page-id";
const element = { id: "active-page-id", level: 2, parentId: "parent-id" };
const pages = {};

describe("useTable", () => {
  it("should return correct values when element is not active and not a parent", () => {
    const { result } = renderHook(() =>
      useTable(activePageId, { ...element, id: "not-active-page-id" }, pages)
    );
    expect(result.current.mod).toBe("");
    expect(result.current.isPageActive).toBe(false);
    expect(result.current.set).toBeInstanceOf(Set);
    expect(result.current.isParent).toBe(false);
  });

  it("should return correct values when element is active and level >= 1", () => {
    const { result } = renderHook(() => useTable(activePageId, element, pages));
    expect(result.current.mod).toBe("dark");
    expect(result.current.isPageActive).toBe(true);
  });

  it("should return correct values when element is and level < 1", () => {
    const modifiedElement = { ...element, level: 0 };
    const { result } = renderHook(() =>
      useTable(activePageId, modifiedElement, pages)
    );
    expect(result.current.mod).toBe("light");
    expect(result.current.isPageActive).toBe(true);
  });
});
