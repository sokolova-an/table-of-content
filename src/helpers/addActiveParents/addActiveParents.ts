import { IPage } from "@/types/types";

export const addActiveParents = (
  set: Set<string>,
  pages: Record<string, IPage>,
  element: IPage
): void => {
  let parentId = element.parentId;

  if (parentId === "ij") {
    set.clear();
  } else {
    while (parentId !== "ij") {
      if (!set.has(parentId)) {
        set.clear();
        break;
      }
      pages[parentId].pages?.forEach((i: string) => {
        if (set.has(i)) {
          set.delete(i);
        }
      });
      parentId = pages[parentId]?.parentId;
    }
  }

  parentId = element.parentId;
  while (parentId !== "ij") {
    set.add(parentId);
    parentId = pages[parentId].parentId;
  }
};
