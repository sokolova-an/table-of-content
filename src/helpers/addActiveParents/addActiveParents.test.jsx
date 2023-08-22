import { addActiveParents } from "./addActiveParents";

const pages = {
  "page-1": { parentId: "parent-1" },
  "page-2": { parentId: "parent-2" },
  "parent-1": {
    parentId: "parent-2",
    pages: { "page-1": true, "page-2": true },
  },
  "parent-2": { parentId: "ij", pages: {} },
};

describe("addActiveParents", () => {
  it('should clear the set if parentId is "ij"', () => {
    const set = new Set(["parent-2"]);
    addActiveParents(set, pages, pages["parent-2"]);
    expect(set.size).toBe(0);
  });

  it("should clear the set and add parent ids for valid parentId", () => {
    const set = new Set(["page-1", "child-1", "child-2"]);
    addActiveParents(set, pages, pages["page-1"]);
    expect(set.size).toBe(2);
    expect(set.has("page-1")).toBe(false);
    expect(set.has("child-1")).toBe(false);
    expect(set.has("child-2")).toBe(false);
    expect(set.has("parent-1")).toBe(true);
    expect(set.has("parent-2")).toBe(true);
    expect(set.has("ij")).toBe(false);
  });
});
